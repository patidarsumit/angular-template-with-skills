import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { getControlErrorMessage, shouldShowControlError } from './form-field.helpers';

@Component({
  selector: 'app-switch-field',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  template: `
    <div class="app-choice-field">
      <mat-slide-toggle [formControl]="control()">{{ label() }}</mat-slide-toggle>

      @if (hasError()) {
        <p class="app-choice-field__error">{{ getErrorText() }}</p>
      } @else if (description()) {
        <p class="app-choice-field__hint">{{ description() }}</p>
      } @else if (hint()) {
        <p class="app-choice-field__hint">{{ hint() }}</p>
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
  readonly description = input('');
  readonly hint = input('');
  readonly required = input(false, { transform: booleanAttribute });
  readonly error = input('');

  hasError(): boolean {
    return shouldShowControlError(this.control());
  }

  getErrorText(): string {
    return (
      this.error() ||
      getControlErrorMessage(this.control(), this.label(), 'Please update this setting.')
    );
  }
}
