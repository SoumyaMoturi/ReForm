import type { FormFieldType } from "../types/form-schema.type";

export const useConditional = (
  field: FormFieldType,
  formData: Record<string, any>
): boolean => {
  if (!field.conditional) return true;
  return formData[field.conditional.field] === field.conditional.value;
};
