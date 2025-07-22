import React from "react";
import type { FormFieldType } from "../../types/form-schema.type";

type Props = {
  fields: FormFieldType[];
  setFields: (fields: FormFieldType[]) => void;
  onSelectField: (id: string) => void;
};

const Canvas: React.FC<Props> = ({ fields, setFields, onSelectField }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("fieldType") as FormFieldType["type"];
    const id = "fld_" + Math.random().toString(36).substr(2, 4); // unique ID generation
    const newField: FormField = {
      id,
      label: `Field ${fields.length + 1}`,
      type,
    };
    setFields([...fields, newField]);
  };

  return (
    <div
      className="border rounded p-3 bg-light"
      style={{ minHeight: "200px" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h5 className="mb-3">Active Step</h5>
      {fields.length === 0 && (
        <div className="text-muted">
          Drag a field from the palette to start.
        </div>
      )}
      {fields.map((field) => (
        <div
          key={field.id}
          className="border p-2 mb-2 bg-white rounded shadow-sm"
          onClick={() => onSelectField(field.id)}
        >
          <strong>{field.label}</strong>{" "}
          <span className="text-muted">({field.type})</span>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
