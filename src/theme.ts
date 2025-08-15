import { Theme } from './types.js';

export class ThemeManager {
  private themeToggle: HTMLElement;
  private currentTheme: Theme;

  constructor() {
    this.themeToggle = this.getRequiredElementById<HTMLElement>('themeToggle');
    this.currentTheme = this.getInitialTheme();
    
    this.setupEventListeners();
    this.applyTheme(this.currentTheme);
  }

  // Get current theme
  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // Toggle theme mode
  public toggle(): void {
    const newTheme: Theme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // Set specific theme
  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  // Get initial theme
  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme === 'dark' ? 'dark' : 'light';
  }

  // Apply theme to document
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);
  }

  // Save theme preference
  private saveTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }

  // Update theme icon
  private updateThemeIcon(theme: Theme): void {
    const themeIcon = this.themeToggle.querySelector('.theme-icon');
    if (!themeIcon) return;

    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      `;
    } else {
      themeIcon.innerHTML = `
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      `;
    }
  }

  // Setup event listeners
  private setupEventListeners(): void {
    this.themeToggle.addEventListener('click', () => this.toggle());
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