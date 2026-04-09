import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { FormFieldOption } from './form-field.models';

@Component({
  selector: 'app-radio-field',
  imports: [CommonModule, MatRadioModule, ReactiveFormsModule],
  template: `
    <div class="app-choice-field">
      <p class="app-choice-field__label">{{ label() }}</p>

      <mat-radio-group class="app-choice-field__group" [formControl]="control()">
        @for (option of options(); track option.label) {
          <mat-radio-button [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-radio-button>
        }
      </mat-radio-group>

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
      gap: 0.75rem;
    }

    .app-choice-field__label,
    .app-choice-field__hint,
    .app-choice-field__error {
      margin: 0;
    }

    .app-choice-field__label {
      color: var(--mat-sys-on-surface);
      font: var(--mat-sys-label-large);
    }

    .app-choice-field__hint {
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-small);
    }

    .app-choice-field__error {
      color: var(--mat-sys-error);
      font: var(--mat-sys-body-small);
    }

    .app-choice-field__group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFieldComponent<T = string> {
  readonly control = input.required<FormControl<T | null>>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly FormFieldOption<T>[]>();
  readonly hint = input('');
  readonly error = input('');

  hasError(): boolean {
    const control = this.control();
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorText(): string {
    const control = this.control();
    if (control.hasError('required')) {
      return this.error() || `${this.label()} is required.`;
    }

    return this.error() || 'Please choose one option.';
  }
}
