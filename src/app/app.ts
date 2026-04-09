import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { startWith } from 'rxjs';

import {
  AutocompleteFieldComponent,
  CheckboxFieldComponent,
  type FormFieldOption,
  RadioFieldComponent,
  SelectFieldComponent,
  SwitchFieldComponent,
  TextareaFieldComponent,
  TextFieldComponent,
} from './shared/components/form';

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
    CommonModule,
    ReactiveFormsModule,
    AutocompleteFieldComponent,
    CheckboxFieldComponent,
    RadioFieldComponent,
    SelectFieldComponent,
    SwitchFieldComponent,
    TextareaFieldComponent,
    TextFieldComponent,
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

  readonly roleOptions: readonly FormFieldOption[] = [
    { label: 'Product designer', value: 'designer' },
    { label: 'Frontend engineer', value: 'frontend' },
    { label: 'Product manager', value: 'pm' },
    { label: 'Growth marketer', value: 'growth' },
  ];

  readonly teamOptions: readonly FormFieldOption[] = [
    { label: 'Core product', value: 'core' },
    { label: 'Platform', value: 'platform' },
    { label: 'Experience design', value: 'design' },
  ];

  readonly workspaceOptions: readonly FormFieldOption[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-site', value: 'onsite' },
  ];

  readonly countryOptions: readonly FormFieldOption[] = [
    { label: 'India', value: 'India' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United States', value: 'United States' },
  ];

  readonly profileForm = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    headline: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(12)],
    }),
    bio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(24)],
    }),
    role: new FormControl<string | null>(null, Validators.required),
    team: new FormControl<string | null>(null, Validators.required),
    workspace: new FormControl<string | null>('remote', Validators.required),
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    subscribe: new FormControl(true, { nonNullable: true }),
    termsAccepted: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  readonly formValuePreview = toSignal(
    this.profileForm.valueChanges.pipe(startWith(this.profileForm.getRawValue())),
    { initialValue: this.profileForm.getRawValue() },
  );

  constructor() {
    this.applyTheme(this.themeMode());
  }

  toggleTheme(): void {
    const nextMode: ThemeMode = this.isDarkMode() ? 'light' : 'dark';
    this.themeMode.set(nextMode);
    this.applyTheme(nextMode);
  }

  revealFormErrors(): void {
    this.profileForm.markAllAsTouched();
    this.profileForm.updateValueAndValidity();
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
