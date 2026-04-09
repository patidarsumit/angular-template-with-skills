import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <mat-form-field class="app-form-field" [appearance]="appearance()">
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [formControl]="control()"
        [type]="type()"
        [placeholder]="placeholder()"
        [autocomplete]="autocomplete()"
      />

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
export class TextFieldComponent {
  readonly control = input.required<FormControl<string | null>>();
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly hint = input('');
  readonly autocomplete = input('off');
  readonly type = input<'email' | 'password' | 'search' | 'tel' | 'text' | 'url'>('text');
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

    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength ?? 0;
      return `Please enter at least ${requiredLength} characters.`;
    }

    return this.error() || 'Please enter a valid value.';
  }
}
