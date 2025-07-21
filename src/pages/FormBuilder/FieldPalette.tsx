import React from 'react';

const fieldTypes = ['Text', 'Email', 'Textarea', 'Checkbox', 'Select', 'Radio', 'Date', 'File'];

const FieldPalette: React.FC = () => {
  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">🧩 Field Palette</h5>
      <div className="d-flex flex-wrap gap-2">
        {fieldTypes.map((type) => (
          <button
            key={type}
            draggable
            className="btn btn-outline-primary"
            onDragStart={(e) => e.dataTransfer.setData('fieldType', type.toLowerCase())}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldPalette;