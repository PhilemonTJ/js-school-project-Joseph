import { TimelineEvent } from './types.js';
import { truncateDescription, sortEventsByYear } from './utils.js';
import { Modal } from './modal.js';

export class TimelineRenderer {
  private timelineContainer: HTMLElement;

  constructor(_modal: Modal) {
    this.timelineContainer = this.getRequiredElementById<HTMLElement>('timeline');
  }

  // Render timeline events
  public render(events: TimelineEvent[]): void {
    if (events.length === 0) {
      this.showEmptyState();
      return;
    }

    const sortedEvents = sortEventsByYear(events);
    const timelineHTML = this.generateTimelineHTML(sortedEvents);
    this.timelineContainer.innerHTML = timelineHTML;
  }

  // Show loading state
  public showLoading(): void {
    this.timelineContainer.innerHTML = '<div class="loading">Loading timeline events...</div>';
  }

  // Show error message
  public showError(message: string): void {
    this.timelineContainer.innerHTML = `<div class="loading">${this.escapeHtml(message)}</div>`;
  }

  // Show empty state
  private showEmptyState(): void {
    this.timelineContainer.innerHTML = '<div class="loading">No events found matching your filters.</div>';
  }

  // Generate timeline HTML
  private generateTimelineHTML(events: TimelineEvent[]): string {
    return events.map(event => this.generateEventHTML(event)).join('');
  }

  // Generate event HTML
  private generateEventHTML(event: TimelineEvent): string {
    return `
      <article class="timeline-event" data-event-id="${event.id}">
        <div class="timeline-marker" onclick="window.timelineApp.openModal(${event.id})"></div>
        <div class="timeline-content" onclick="window.timelineApp.openModal(${event.id})">
          <div class="timeline-year">${event.year}</div>
          <h3 class="timeline-title">${this.escapeHtml(event.title)}</h3>
          <p class="timeline-description">${this.escapeHtml(truncateDescription(event.description, 100))}</p>
          <span class="timeline-category">${this.escapeHtml(event.category)}</span>
        </div>
      </article>
    `;
  }

  // Escape HTML content
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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