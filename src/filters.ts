import { TimelineEvent, FilterOptions } from './types.js';
import { getUniqueCategories, getUniqueYears } from './utils.js';

export class FilterManager {
  private categoryFilter: HTMLSelectElement;
  private yearFilter: HTMLSelectElement;
  private events: TimelineEvent[] = [];
  private onFilterChange: (filteredEvents: TimelineEvent[]) => void;

  constructor(onFilterChange: (filteredEvents: TimelineEvent[]) => void) {
    this.categoryFilter = this.getRequiredElementById<HTMLSelectElement>('categoryFilter');
    this.yearFilter = this.getRequiredElementById<HTMLSelectElement>('yearFilter');
    this.onFilterChange = onFilterChange;
    
    this.setupEventListeners();
  }

  // Set events data
  public setEvents(events: TimelineEvent[]): void {
    this.events = events;
    this.populateFilters();
    this.applyFilters();
  }

  // Get filter options
  public getFilterOptions(): FilterOptions {
    return {
      category: this.categoryFilter.value,
      year: this.yearFilter.value
    };
  }

  // Apply current filters
  public applyFilters(): TimelineEvent[] {
    const selectedCategory = this.categoryFilter.value;
    const selectedYear = this.yearFilter.value;

    const filteredEvents = this.events.filter(event => {
      const categoryMatch = !selectedCategory || event.category === selectedCategory;
      const yearMatch = !selectedYear || event.year === parseInt(selectedYear);
      return categoryMatch && yearMatch;
    });

    this.onFilterChange(filteredEvents);
    return filteredEvents;
  }

  // Clear all filters
  public clearFilters(): void {
    this.categoryFilter.value = '';
    this.yearFilter.value = '';
    this.applyFilters();
  }

  // Populate filter options
  private populateFilters(): void {
    this.populateCategoryFilter();
    this.populateYearFilter();
  }

  // Populate category filter
  private populateCategoryFilter(): void {
    while (this.categoryFilter.children.length > 1) {
      this.categoryFilter.removeChild(this.categoryFilter.lastChild!);
    }

    const categories = getUniqueCategories(this.events);
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      this.categoryFilter.appendChild(option);
    });
  }

  // Populate year filter
  private populateYearFilter(): void {
    while (this.yearFilter.children.length > 1) {
      this.yearFilter.removeChild(this.yearFilter.lastChild!);
    }

    const years = getUniqueYears(this.events);
    
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year.toString();
      option.textContent = year.toString();
      this.yearFilter.appendChild(option);
    });
  }

  // Setup event listeners
  private setupEventListeners(): void {
    this.categoryFilter.addEventListener('change', () => this.applyFilters());
    this.yearFilter.addEventListener('change', () => this.applyFilters());
  }

  // Get required element
  private getRequiredElementById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Required element with ID '${id}' not found`);
    }
    return element as T;
  }
} 