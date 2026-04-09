import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormFieldOption } from './form-field.models';

@Component({
  selector: 'app-autocomplete-field',
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field class="app-form-field" [appearance]="appearance()">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [formControl]="control()"
        [placeholder]="placeholder()"
        [matAutocomplete]="auto"
        (input)="onInput(($any($event.target).value ?? '').toString())"
      />

      <mat-autocomplete #auto="matAutocomplete">
        @for (option of filteredOptions(); track option.label) {
          <mat-option [value]="option.label">{{ option.label }}</mat-option>
        }
      </mat-autocomplete>

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
export class AutocompleteFieldComponent {
  readonly control = input.required<FormControl<string | null>>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly FormFieldOption<string>[]>();
  readonly placeholder = input('');
  readonly hint = input('');
  readonly appearance = input<'fill' | 'outline'>('outline');
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
    const control = this.control();
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorText(): string {
    const control = this.control();
    if (control.hasError('required')) {
      return this.error() || `${this.label()} is required.`;
    }

    return this.error() || 'Please choose a matching value.';
  }

  onInput(value: string): void {
    this.filterQuery.set(value);
  }
}
