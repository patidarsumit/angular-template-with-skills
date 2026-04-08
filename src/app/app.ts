import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'angular-skill-theme-mode';

  readonly themeMode = signal<ThemeMode>(this.getInitialThemeMode());
  readonly isDarkMode = computed(() => this.themeMode() === 'dark');

  readonly featureCards = [
    {
      icon: 'palette',
      title: 'Material 3 token layer',
      description:
        'Angular Material system variables power the core theme while app-level tokens shape surfaces, spacing, and gradients.',
    },
    {
      icon: 'dark_mode',
      title: 'Light and dark themes',
      description:
        'The app swaps between dedicated light and dark token sets without changing component markup.',
    },
    {
      icon: 'tune',
      title: 'Customizable foundations',
      description:
        'Primary, surface, outline, radius, and motion tokens are centralized for fast future design updates.',
    },
  ] as const;

  readonly systemTokens = [
    '--mat-sys-primary',
    '--mat-sys-surface',
    '--mat-sys-on-surface',
    '--mat-sys-outline',
  ] as const;

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
