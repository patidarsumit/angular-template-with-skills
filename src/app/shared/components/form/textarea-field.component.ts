import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { getControlErrorMessage, shouldShowControlError } from './form-field.helpers';

@Component({
  selector: 'app-textarea-field',
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
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

      <textarea
        matInput
        [formControl]="control()"
        [placeholder]="placeholder()"
        [rows]="rows()"
        [readonly]="readonly()"
        [required]="required()"
      ></textarea>

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
export class TextareaFieldComponent {
  readonly control = input.required<FormControl<string | null>>();
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly description = input('');
  readonly hint = input('');
  readonly rows = input(4);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'dynamic' | 'fixed'>('dynamic');
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly prefixIcon = input('');
  readonly suffixIcon = input('');
  readonly error = input('');

  hasError(): boolean {
    return shouldShowControlError(this.control());
  }

  getErrorText(): string {
    return (
      this.error() ||
      getControlErrorMessage(this.control(), this.label(), 'Please enter a valid value.')
    );
  }
}
