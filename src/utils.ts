import { TimelineEvent } from './types.js';

// Truncate text description
export function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Sort events by year
export function sortEventsByYear(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => a.year - b.year);
}

// Get unique categories
export function getUniqueCategories(events: TimelineEvent[]): string[] {
  return [...new Set(events.map(event => event.category))].sort();
}

// Get unique years
export function getUniqueYears(events: TimelineEvent[]): number[] {
  return [...new Set(events.map(event => event.year))].sort((a, b) => a - b);
}

// Get element by ID
export function getElementById<T extends HTMLElement>(id: string): T | null {
  const element = document.getElementById(id);
  return element as T | null;
}

// Get required element
export function getRequiredElementById<T extends HTMLElement>(id: string): T {
  const element = getElementById<T>(id);
  if (!element) {
    throw new Error(`Required element with ID '${id}' not found`);
  }
  return element;
} 