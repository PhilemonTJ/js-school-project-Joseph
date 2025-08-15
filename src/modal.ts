import { TimelineEvent } from './types.js';

export class Modal {
  private modal: HTMLElement;
  private modalBody: HTMLElement;
  private modalClose: HTMLElement;

  constructor() {
    this.modal = this.getRequiredElementById<HTMLElement>('modal');
    this.modalBody = this.getRequiredElementById<HTMLElement>('.modal-body');
    this.modalClose = this.getRequiredElementById<HTMLElement>('modalClose');
    
    this.setupEventListeners();
  }

  // Open modal with event
  public open(event: TimelineEvent): void {
    const modalHTML = this.generateModalHTML(event);
    this.modalBody.innerHTML = modalHTML;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  public close(): void {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Check if active
  public isActive(): boolean {
    return this.modal.classList.contains('active');
  }

  // Setup event listeners
  private setupEventListeners(): void {
    this.modalClose.addEventListener('click', () => this.close());

    this.modal.addEventListener('click', (e: Event) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isActive()) {
        this.close();
      }
    });
  }

  // Generate modal HTML
  private generateModalHTML(event: TimelineEvent): string {
    const imageHTML = event.imageURL 
      ? `<img src="${event.imageURL}" alt="${event.title}" class="modal-image" onerror="this.style.display='none'">` 
      : '';

    return `
      ${imageHTML}
      <h2 class="modal-title">${this.escapeHtml(event.title)}</h2>
      <div class="modal-year">${event.year}</div>
      <p class="modal-description">${this.escapeHtml(event.description)}</p>
      <span class="modal-category">${this.escapeHtml(event.category)}</span>
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
    let element: HTMLElement | null;
    
    if (id.startsWith('.')) {
      element = document.querySelector(id);
    } else {
      element = document.getElementById(id);
    }
    
    if (!element) {
      throw new Error(`Required element '${id}' not found`);
    }
    
    return element as T;
  }
} 