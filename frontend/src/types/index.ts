export type Screen = 'expense' | 'history' | 'stats' | 'settings';

export type CategoryId =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'services'
  | 'leisure'
  | 'other';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export interface Expense {
  id: string;
  amount: number;
  categoryId: CategoryId;
  date: Date;
}

export interface HistoryItem {
  icon: string;
  label: string;
  time: string;
  amount: number;
}

export type StatTab = 'day' | 'week' | 'month';
