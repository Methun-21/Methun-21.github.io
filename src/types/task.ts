export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export type ViewType = 'today' | 'completed' | 'all';