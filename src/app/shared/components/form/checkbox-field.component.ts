import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { getControlErrorMessage, shouldShowControlError } from './form-field.helpers';

@Component({
  selector: 'app-checkbox-field',
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  template: `
    <div class="app-choice-field">
      <mat-checkbox [formControl]="control()">{{ label() }}</mat-checkbox>

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
      padding-left: 2rem;
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
export class CheckboxFieldComponent {
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
      getControlErrorMessage(this.control(), this.label(), 'Please confirm this option.')
    );
  }
}
