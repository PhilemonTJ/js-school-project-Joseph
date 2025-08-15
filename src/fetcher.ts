import { TimelineEvent } from './types.js';

// Fetch timeline events
export async function fetchEvents(): Promise<TimelineEvent[]> {
  try {
    const response = await fetch('data/events.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const events: TimelineEvent[] = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to load timeline events. Please try again later.');
  }
}

// Validate event data
export function validateEvents(data: unknown): TimelineEvent[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid data format: expected an array');
  }

  return data.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Invalid event at index ${index}: expected an object`);
    }

    const event = item as Record<string, unknown>;
    
    if (typeof event.id !== 'number') {
      throw new Error(`Invalid event at index ${index}: 'id' must be a number`);
    }
    if (typeof event.year !== 'number') {
      throw new Error(`Invalid event at index ${index}: 'year' must be a number`);
    }
    if (typeof event.title !== 'string') {
      throw new Error(`Invalid event at index ${index}: 'title' must be a string`);
    }
    if (typeof event.description !== 'string') {
      throw new Error(`Invalid event at index ${index}: 'description' must be a string`);
    }
    if (typeof event.imageURL !== 'string') {
      throw new Error(`Invalid event at index ${index}: 'imageURL' must be a string`);
    }
    if (typeof event.category !== 'string') {
      throw new Error(`Invalid event at index ${index}: 'category' must be a string`);
    }

    return {
      id: event.id,
      year: event.year,
      title: event.title,
      description: event.description,
      imageURL: event.imageURL,
      category: event.category
    } as TimelineEvent;
  });
} 