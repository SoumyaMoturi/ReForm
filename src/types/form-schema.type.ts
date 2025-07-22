export type FieldType =
  | "text"
  | "email"
  | "checkbox"
  | "select"
  | "radio"
  | "file"
  | "date";

export interface ConditionalLogic {
  field: string;
  value: any;
}

export interface FormFieldType {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  multiple?: boolean;
  conditional?: ConditionalLogic;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface Step {
  title: string;
  fields: FormFieldType[];
}

export interface FormSchema {
  title: string;
  steps: Step[];
}
