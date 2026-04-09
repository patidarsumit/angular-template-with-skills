import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FormFieldOption } from './form-field.models';

@Component({
  selector: 'app-select-field',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field class="app-form-field" [appearance]="appearance()">
      <mat-label>{{ label() }}</mat-label>
      <mat-select [formControl]="control()">
        @for (option of options(); track option.label) {
          <mat-option [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>

      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }

      @if (hasError()) {
        <mat-error>{{ getErrorText() }}</mat-error>
      }
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent<T = string> {
  readonly control = input.required<FormControl<T | null>>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly FormFieldOption<T>[]>();
  readonly hint = input('');
  readonly appearance = input<'fill' | 'outline'>('outline');
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

    return this.error() || 'Please select an option.';
  }
}
