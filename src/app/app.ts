import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'angular-skill-theme-mode';

  readonly themeMode = signal<ThemeMode>(this.getInitialThemeMode());
  readonly isDarkMode = computed(() => this.themeMode() === 'dark');

  constructor() {
    this.applyTheme(this.themeMode());
  }

  toggleTheme(): void {
    const nextMode: ThemeMode = this.isDarkMode() ? 'light' : 'dark';
    this.themeMode.set(nextMode);
    this.applyTheme(nextMode);
  }

  private getInitialThemeMode(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(mode: ThemeMode): void {
    const body = this.document.body;

    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light');
    body.setAttribute('data-theme', mode);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, mode);
    }
  }
}
