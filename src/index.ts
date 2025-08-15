import { TimelineEvent, AppState } from './types.js';
import { fetchEvents, validateEvents } from './fetcher.js';
import { Modal } from './modal.js';
import { ThemeManager } from './theme.js';
import { TimelineRenderer } from './renderer.js';
import { FilterManager } from './filters.js';

export class TimelineApp {
  private state: AppState;
  private modal: Modal;
  private themeManager: ThemeManager;
  private renderer: TimelineRenderer;
  private filterManager: FilterManager;

  constructor() {
    this.state = {
      events: [],
      filteredEvents: [],
      currentTheme: 'light'
    };

    this.modal = new Modal();
    this.themeManager = new ThemeManager();
    this.renderer = new TimelineRenderer(this.modal);
    this.filterManager = new FilterManager((filteredEvents) => {
      this.state.filteredEvents = filteredEvents;
      this.renderer.render(filteredEvents);
    });

    (window as any).timelineApp = this;
  }

  // Initialize the application
  public async initialize(): Promise<void> {
    try {
      this.renderer.showLoading();
      await this.loadEvents();
      this.filterManager.setEvents(this.state.events);
    } catch (error) {
      console.error('Failed to initialize timeline app:', error);
      this.renderer.showError(error instanceof Error ? error.message : 'Failed to load events');
    }
  }

  // Load events data
  private async loadEvents(): Promise<void> {
    const rawData = await fetchEvents();
    const validatedEvents = validateEvents(rawData);
    
    this.state.events = validatedEvents;
    this.state.filteredEvents = [...validatedEvents];
    
    this.renderer.render(this.state.filteredEvents);
  }

  // Open event modal
  public openModal(eventId: number): void {
    const event = this.state.events.find(e => e.id === eventId);
    if (!event) {
      console.error(`Event with ID ${eventId} not found`);
      return;
    }
    
    this.modal.open(event);
  }

  // Get application state
  public getState(): AppState {
    return { ...this.state };
  }

  // Get all events
  public getEvents(): TimelineEvent[] {
    return [...this.state.events];
  }

  // Get filtered events
  public getFilteredEvents(): TimelineEvent[] {
    return [...this.state.filteredEvents];
  }

  // Get current theme
  public getCurrentTheme(): string {
    return this.themeManager.getCurrentTheme();
  }

  // Toggle theme mode
  public toggleTheme(): void {
    this.themeManager.toggle();
  }

  // Clear all filters
  public clearFilters(): void {
    this.filterManager.clearFilters();
  }
}

declare global {
  interface Window {
    timelineApp: TimelineApp;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new TimelineApp();
  await app.initialize();
}); 