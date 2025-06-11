import { GoogleGenerativeAI } from '@google/generative-ai';
import { Task } from '@/types/task';
import { TaskGroup, GroupSuggestion } from '@/types/taskGroup';
import { v4 as uuidv4 } from 'uuid';

// Check if API key is available
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

function cleanJsonResponse(text: string): string {
  // Remove markdown code block syntax if present
  return text.replace(/```json\n?|\n?```/g, '').trim();
}

export async function suggestTaskGroups(tasks: Task[]): Promise<GroupSuggestion> {
  if (tasks.length === 0) {
    return {
      groups: [],
      timestamp: new Date().toISOString(),
    };
  }

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    You are an intelligent task organization system. Your goal is to analyze tasks and create meaningful, logical groups that help users better manage their work.

    Here are the tasks to analyze:
    ${tasks.map(task => `- ${task.title} (Priority: ${task.priority}, Due: ${task.dueDate || 'No date'}, Category: ${task.category || 'None'})`).join('\n')}

    Follow these strict grouping rules:
    1. Priority-based Groups:
       - Group P1 (critical) tasks together
       - Group P2 (medium) tasks together
       - Group P3 (low) tasks together
       Only if there are multiple tasks with the same priority

    2. Time-based Groups:
       - Group tasks due on the same day
       - Group tasks due this week
       - Group tasks due next week
       Only create these groups if there are multiple tasks with dates

    3. Context-based Groups:
       - Group all meeting-related tasks together
       - Group all design/UI-related tasks together
       - Group tasks with similar themes or purposes
       - Look for keywords like "review", "meeting", "design", "bug", etc.

    4. Smart Combinations:
       - A task can belong to multiple groups if relevant
       - Example: A "design team meeting" task could be in both "Meetings" and "Design Tasks" groups
       - Prioritize meaningful relationships over forced groupings

    5. Confidence Scoring:
       - 0.9-1.0: Very strong relationship (same category, priority, and theme)
       - 0.8-0.9: Strong relationship (same category and theme)
       - 0.7-0.8: Moderate relationship (similar themes or timing)
       - Below 0.7: Don't create a group

    Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
    {
      "groups": [
        {
          "name": "group name",
          "description": "clear explanation of why these tasks are grouped together",
          "confidence": 0.8,
          "taskIndices": [0, 1]
        }
      ]
    }

    Important:
    - Each group must have at least 2 tasks
    - Each group must have a clear, specific description
    - Group names should be concise but descriptive
    - Don't create groups with confidence below 0.7
    - taskIndices must be valid array indices from the task list
    - Include tasks in multiple groups where it makes logical sense
  `;

  try {
    console.log('Sending tasks to Gemini:', tasks);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Raw Gemini response:', text);
    
    const cleanedText = cleanJsonResponse(text);
    console.log('Cleaned response:', cleanedText);
    
    const data = JSON.parse(cleanedText);

    const groups: TaskGroup[] = data.groups.map((group: any) => ({
      id: uuidv4(),
      name: group.name,
      description: group.description,
      confidence: group.confidence,
      tasks: group.taskIndices.map((index: number) => tasks[index]),
    }));

    return {
      groups,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error suggesting task groups:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate groups: ${error.message}`);
    }
    throw new Error('Failed to generate groups: Unknown error');
  }
} 