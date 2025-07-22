import React from "react";
import type { FormFieldType } from "../../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (val: string) => void;
}

const RadioField: React.FC<Props> = ({ field, value, onChange }) => (
  <div className="mb-3">
    <label className="form-label d-block">{field.label}</label>
    {field.options?.map((opt) => (
      <div className="form-check form-check-inline" key={opt}>
        <input
          type="radio"
          id={`${field.id}_${opt}`}
          name={field.id}
          value={opt}
          checked={value === opt}
          className="form-check-input"
          onChange={() => onChange(opt)}
        />
        <label htmlFor={`${field.id}_${opt}`} className="form-check-label">
          {opt}
        </label>
      </div>
    ))}
  </div>
);

export default RadioField;
