import React from 'react';
import type { FormField } from '../../types/FieldTypes';

type Props = {
  schema: FormField[];
  setSchema: (fields: FormField[]) => void;
  onSelectField: (id: string) => void;
};

const Canvas: React.FC<Props> = ({ schema, setSchema, onSelectField }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('fieldType') as FormField['type'];
    const id = 'field_' + Date.now();
    const newField: FormField = {
      id,
      label: `Field ${schema.length + 1}`,
      type,
      required: false,
    };
    setSchema([...schema, newField]);
  };

  return (
    <div
      className="border rounded p-3 mb-3 bg-light"
      style={{ minHeight: '200px' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h5 className="mb-3">📝 Canvas</h5>
      {schema.length === 0 && (
        <div className="text-muted">Drag fields from the palette to begin.</div>
      )}
      {schema.map((field) => (
        <div
          key={field.id}
          className="border p-2 mb-2 bg-white rounded shadow-sm"
          onClick={() => onSelectField(field.id)}
        >
          <strong>{field.label}</strong> <span className="text-muted">({field.type})</span>
        </div>
      ))}
    </div>
  );
};

export default Canvas;