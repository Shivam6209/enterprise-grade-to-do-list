export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  description?: string;
  category?: string;
} 