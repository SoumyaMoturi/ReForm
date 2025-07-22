import React from "react";
import type { FormFieldType } from "../../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (val: string) => void;
}

const SelectField: React.FC<Props> = ({ field, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={field.id} className="form-label">
      {field.label}
    </label>
    <select
      id={field.id}
      value={value}
      required={field.required}
      className="form-select"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">-- Select --</option>
      {field.options?.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
