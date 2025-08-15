export interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  imageURL: string;
  category: string;
}

export interface FilterOptions {
  category: string;
  year: string;
}

export type Theme = 'light' | 'dark';

export interface DOMElements {
  timelineContainer: HTMLElement;
  modal: HTMLElement;
  modalBody: HTMLElement;
  modalClose: HTMLElement;
  themeToggle: HTMLElement;
  categoryFilter: HTMLSelectElement;
  yearFilter: HTMLSelectElement;
}

export interface AppState {
  events: TimelineEvent[];
  filteredEvents: TimelineEvent[];
  currentTheme: Theme;
} 