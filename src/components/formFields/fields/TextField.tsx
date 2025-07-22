import React from "react";
import type { FormFieldType } from "../../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (val: string) => void;
}

const TextField: React.FC<Props> = ({ field, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={field.id} className="form-label">
      {field.label}
    </label>
    <input
      type={field.type}
      id={field.id}
      value={value}
      required={field.required}
      className="form-control"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default TextField;
