import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-switch-field',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  template: `
    <div class="app-choice-field">
      <mat-slide-toggle [formControl]="control()">{{ label() }}</mat-slide-toggle>

      @if (hint()) {
        <p class="app-choice-field__hint">{{ hint() }}</p>
      }

      @if (hasError()) {
        <p class="app-choice-field__error">{{ getErrorText() }}</p>
      }
    </div>
  `,
  styles: `
    .app-choice-field {
      display: grid;
      gap: 0.5rem;
    }

    .app-choice-field__hint,
    .app-choice-field__error {
      margin: 0;
      padding-left: 3.25rem;
    }

    .app-choice-field__hint {
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-small);
    }

    .app-choice-field__error {
      color: var(--mat-sys-error);
      font: var(--mat-sys-body-small);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchFieldComponent {
  readonly control = input.required<FormControl<boolean>>();
  readonly label = input.required<string>();
  readonly hint = input('');
  readonly error = input('');

  hasError(): boolean {
    const control = this.control();
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorText(): string {
    const control = this.control();
    if (control.hasError('required') || control.hasError('requiredTrue')) {
      return this.error() || `${this.label()} is required.`;
    }

    return this.error() || 'Please update this setting.';
  }
}
