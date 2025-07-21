import  { useState } from 'react';
import { saveFormSchema } from '../../services/form-schema.service';
import type { FormField } from '../../types/FieldTypes';
import FieldPalette from './FieldPalette';
import Canvas from './Canvas';
import ConfigPanel from './ConfigPanel';

const FormBuilder = () => {
  const [schema, setSchema] = useState<FormField[]>([]);
  const [formName, setFormName] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedField = schema.find((f) => f.id === selectedId);
  const updateField = (updated: FormField) => {
    setSchema(schema.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleSave = async () => {
    try {
      await saveFormSchema(formName, { title: formName, steps: [{ title: formName, fields: schema }] });
      alert('Saved to Cloud!');
    } catch {
      alert('Error saving schema');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Form Builder</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
      />
      <FieldPalette />
      <Canvas schema={schema} setSchema={setSchema} onSelectField={setSelectedId} />
      <ConfigPanel field={selectedField || null} updateField={updateField} />
      <button className="btn btn-success mt-3" onClick={handleSave}>Save</button>
    </div>
  );
};

export default FormBuilder;