import React from "react";
import type { FormFieldType } from "../../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: boolean;
  onChange: (val: boolean) => void;
}

const CheckboxField: React.FC<Props> = ({ field, value, onChange }) => (
  <div className="form-check mb-3">
    <input
      type="checkbox"
      id={field.id}
      checked={value || false}
      className="form-check-input"
      onChange={(e) => onChange(e.target.checked)}
    />
    <label htmlFor={field.id} className="form-check-label">
      {field.label}
    </label>
  </div>
);

export default CheckboxField;
