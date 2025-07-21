import React from 'react';
import type { FormField } from '../../types/FieldTypes';

type Props = {
  field: FormField | null;
  updateField: (field: FormField) => void;
};

const ConfigPanel: React.FC<Props> = ({ field, updateField }) => {
  if (!field) return null;

  const handleChange = (key: keyof FormField, value: any) => {
    updateField({ ...field, [key]: value });
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">⚙️ Field Config</h5>
      <div className="mb-3">
        <label className="form-label">Label</label>
        <input
          type="text"
          className="form-control"
          value={field.label}
          onChange={(e) => handleChange('label', e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Placeholder</label>
        <input
          type="text"
          className="form-control"
          value={field.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
        />
      </div>
      {['select', 'radio'].includes(field.type) && (
        <div className="mb-3">
          <label className="form-label">Options (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={field.options?.join(', ') || ''}
            onChange={(e) =>
              handleChange('options', e.target.value.split(',').map((o) => o.trim()))
            }
          />
        </div>
      )}
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="requiredCheck"
          checked={field.required || false}
          onChange={(e) => handleChange('required', e.target.checked)}
        />
        <label className="form-check-label" htmlFor="requiredCheck">
          Required
        </label>
      </div>
      {field.type === 'select' && (
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="multiCheck"
            checked={field.multiple || false}
            onChange={(e) => handleChange('multiple', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="multiCheck">
            Allow Multiple Selections
          </label>
        </div>
      )}
    </div>
  );
};

export default ConfigPanel;