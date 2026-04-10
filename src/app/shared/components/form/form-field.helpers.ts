import { AbstractControl } from '@angular/forms';

export function shouldShowControlError(control: AbstractControl | null): boolean {
  return !!control && control.invalid && (control.touched || control.dirty);
}

export function getControlErrorMessage(
  control: AbstractControl | null,
  label: string,
  fallback: string,
): string {
  if (!control) {
    return fallback;
  }

  if (control.hasError('required') || control.hasError('requiredTrue')) {
    return `${label} is required.`;
  }

  if (control.hasError('email')) {
    return 'Please enter a valid email address.';
  }

  if (control.hasError('minlength')) {
    const requiredLength = control.getError('minlength')?.requiredLength ?? 0;
    return `Please enter at least ${requiredLength} characters.`;
  }

  if (control.hasError('maxlength')) {
    const requiredLength = control.getError('maxlength')?.requiredLength ?? 0;
    return `Please enter no more than ${requiredLength} characters.`;
  }

  return fallback;
}
