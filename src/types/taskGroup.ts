import { Task } from './task';

export interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
  confidence: number;
  description?: string;
}

export interface GroupSuggestion {
  groups: TaskGroup[];
  timestamp: string;
} 