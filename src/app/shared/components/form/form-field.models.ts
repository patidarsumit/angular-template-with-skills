export interface FormFieldOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
