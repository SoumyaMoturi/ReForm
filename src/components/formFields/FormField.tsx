import React from "react";
import TextField from "./fields/TextField";
import SelectField from "./fields/SelectField";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import DateField from "./fields/DateField";
import FileUpload from "./fields/FileUploadField";
import type { FormFieldType } from "../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: any;
  onChange: (id: string, value: any) => void;
}

const FormField: React.FC<Props> = ({ field, value, onChange }) => {
  const handleUpdate = (val: any) => onChange(field.id, val);

  switch (field.type) {
    case "text":
    case "email":
      return <TextField field={field} value={value} onChange={handleUpdate} />;
    case "select":
      return (
        <SelectField field={field} value={value} onChange={handleUpdate} />
      );
    case "radio":
      return <RadioField field={field} value={value} onChange={handleUpdate} />;
    case "checkbox":
      return (
        <CheckboxField field={field} value={value} onChange={handleUpdate} />
      );
    case "date":
      return <DateField field={field} value={value} onChange={handleUpdate} />;
    case "file":
      return <FileUpload field={field} value={value} onChange={handleUpdate} />;
    default:
      return <p className="text-muted">Unsupported field: {field.type}</p>;
  }
};

export default FormField;
