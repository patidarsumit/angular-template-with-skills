import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { getControlErrorMessage, shouldShowControlError } from './form-field.helpers';
import { FormFieldOption } from './form-field.models';

@Component({
  selector: 'app-autocomplete-field',
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
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

      <input
        matInput
        [formControl]="control()"
        [placeholder]="placeholder()"
        [matAutocomplete]="auto"
        [readonly]="readonly()"
        [required]="required()"
        (input)="onInput(($any($event.target).value ?? '').toString())"
      />

      <mat-autocomplete #auto="matAutocomplete">
        @for (option of filteredOptions(); track option.label) {
          <mat-option [value]="option.label">{{ option.label }}</mat-option>
        }
      </mat-autocomplete>

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
export class AutocompleteFieldComponent {
  readonly control = input.required<FormControl<string | null>>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly FormFieldOption<string>[]>();
  readonly placeholder = input('');
  readonly description = input('');
  readonly hint = input('');
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'dynamic' | 'fixed'>('dynamic');
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly prefixIcon = input('');
  readonly suffixIcon = input('');
  readonly error = input('');
  readonly filterQuery = signal('');

  readonly filteredOptions = computed(() => {
    const query = this.filterQuery().trim().toLowerCase();
    const options = this.options();
    if (!query) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(query));
  });

  hasError(): boolean {
    return shouldShowControlError(this.control());
  }

  getErrorText(): string {
    return (
      this.error() ||
      getControlErrorMessage(this.control(), this.label(), 'Please choose a matching value.')
    );
  }

  onInput(value: string): void {
    this.filterQuery.set(value);
  }
}
