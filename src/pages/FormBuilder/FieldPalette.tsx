import React from "react";

import { fieldTypes } from "../../pages/constants";
const FieldPalette: React.FC = () => {
  return (
    <div className="card p-3 mb-3">
      <h5>🧩 Field Palette</h5>
      <div className="d-grid gap-2">
        {fieldTypes.map((f) => (
          <button
            key={f.type}
            className="btn btn-outline-primary"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("fieldType", f.type)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldPalette;
