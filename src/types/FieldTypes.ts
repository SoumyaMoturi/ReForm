export type FieldType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'checkbox'
  | 'file'
  | 'radio'
  | 'select'
  | 'date';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  multiple?: boolean;
  required?: boolean;
  placeholder?: string;
  conditional?: {
    field: string;
    value: any;
  };
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}