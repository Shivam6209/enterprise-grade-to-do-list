import { Task, Priority } from '@/types/task';
import * as chrono from 'chrono-node';
import { v4 as uuidv4 } from 'uuid';

const PRIORITY_KEYWORDS = {
  P1: ['urgent', 'critical', 'high priority', 'highest priority', 'p1'],
  P2: ['important', 'medium priority', 'p2'],
  P3: ['normal', 'low priority', 'p3'],
  P4: ['optional', 'lowest priority', 'p4'],
};

export function parseTask(input: string): Task | null {
  if (!input.trim()) return null;

  // Extract date and time information
  const parsedDate = chrono.parse(input)[0];
  let dueDate: string | undefined;
  let dueTime: string | undefined;

  if (parsedDate) {
    const date = parsedDate.start.date();
    dueDate = date.toISOString().split('T')[0];
    if (parsedDate.start.isCertain('hour')) {
      dueTime = date.toISOString();
    }
  }

  // Determine priority
  let priority: Priority = 'P3'; // Default priority
  for (const [level, keywords] of Object.entries(PRIORITY_KEYWORDS)) {
    if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
      priority = level as Priority;
      break;
    }
  }

  // Clean up the title by removing date/time and priority keywords
  let title = input;
  if (parsedDate) {
    title = title.replace(parsedDate.text, '');
  }
  Object.values(PRIORITY_KEYWORDS).flat().forEach(keyword => {
    title = title.replace(new RegExp(keyword, 'gi'), '');
  });
  title = title.trim();

  // Extract category if present (e.g., #work, #personal)
  let category: string | undefined;
  const categoryMatch = title.match(/#(\w+)/);
  if (categoryMatch) {
    category = categoryMatch[1];
    title = title.replace(/#\w+/, '').trim();
  }

  return {
    id: uuidv4(),
    title,
    completed: false,
    priority,
    dueDate,
    dueTime,
    category,
  };
} 