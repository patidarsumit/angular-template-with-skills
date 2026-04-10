import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { getControlErrorMessage, shouldShowControlError } from './form-field.helpers';
import { FormFieldOption } from './form-field.models';

@Component({
  selector: 'app-select-field',
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field
      class="app-form-field"
      [appearance]="appearance()"
      [subscriptSizing]="subscriptSizing()"
    >
      <mat-label>{{ label() }}</mat-label>

      @if (prefixIcon()) {
        <mat-icon matPrefix>{{ prefixIcon() }}</mat-icon>
      }

      <mat-select [formControl]="control()" [required]="required()">
        @for (option of options(); track option.label) {
          <mat-option [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>

      @if (suffixIcon()) {
        <mat-icon matSuffix>{{ suffixIcon() }}</mat-icon>
      }

      @if (hasError()) {
        <mat-error>{{ getErrorText() }}</mat-error>
      } @else if (description()) {
        <mat-hint>{{ description() }}</mat-hint>
      } @else if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent<T = string> {
  readonly control = input.required<FormControl<T | null>>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly FormFieldOption<T>[]>();
  readonly description = input('');
  readonly hint = input('');
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'dynamic' | 'fixed'>('dynamic');
  readonly required = input(false, { transform: booleanAttribute });
  readonly prefixIcon = input('');
  readonly suffixIcon = input('');
  readonly error = input('');

  hasError(): boolean {
    return shouldShowControlError(this.control());
  }

  getErrorText(): string {
    return (
      this.error() ||
      getControlErrorMessage(this.control(), this.label(), 'Please select an option.')
    );
  }
}
