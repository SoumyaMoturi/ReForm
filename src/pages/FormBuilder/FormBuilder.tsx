import React, { useState } from "react";
import FieldPalette from "./FieldPalette";
import StepTabs from "./StepTabs";
import Canvas from "./Canvas";
import ConfigPanel from "./ConfigPanel";
import type { FormFieldType, FormSchema } from "../../types/form-schema.type";
import { saveFormSchema } from "../../services/form-schema.service";
import SchemaViewer from "../../components/builder/SchemaViewer";

const FormBuilder: React.FC = () => {
  const [formTitle, setFormTitle] = useState("Account Creation");
  const [schema, setSchema] = useState<FormSchema>({
    title: formTitle,
    steps: [{ title: "Step 1", fields: [] }],
  });
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showJSON, setShowJSON] = useState<boolean>(false);

  const updateActiveStepFields = (fields: FormFieldType[]) => {
    const newSteps = [...schema.steps];
    newSteps[activeStep].fields = fields;
    setSchema({ ...schema, steps: newSteps });
  };

  const updateSelectedField = (updated: FormFieldType) => {
    const updatedSteps = schema.steps.map((step, i) =>
      i === activeStep
        ? {
            ...step,
            fields: step.fields.map((f) => (f.id === updated.id ? updated : f)),
          }
        : step
    );
    setSchema({ ...schema, steps: updatedSteps });
  };

  const selectedField: FormFieldType | null =
    schema.steps[activeStep]?.fields.find((f) => f.id === selectedFieldId) ||
    null;

  const addStep = () => {
    setSchema({
      ...schema,
      steps: [
        ...schema.steps,
        {
          title: `Step ${schema.steps.length + 1}`,
          fields: [],
        },
      ],
    });
    setActiveStep(schema.steps.length); //new step
  };

  const handleExport = () => {
    const exportSchema = {
      ...schema,
      title: formTitle,
    };
    setShowJSON(true);
    console.log("Exported Schema:", exportSchema);
  };

  const handleSave = async (schema: FormSchema) => {
    const formId = `form_${Date.now()}`;
    const exportSchema = {
      ...schema,
      title: formTitle,
    };

    try {
      await saveFormSchema(formId, formTitle, exportSchema);
      alert("✅ Schema saved successfully!");
    } catch (err: any) {
      console.error("❌ Save error:", err.message);
      alert("Failed to save schema");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">🛠️ Form Builder</h2>

      {/* Form title input */}
      <div className="mb-3">
        <label className="form-label">Form Title</label>
        <input
          className="form-control"
          value={formTitle}
          onChange={(e) => {
            setFormTitle(e.target.value);
            setSchema({ ...schema, title: e.target.value });
          }}
        />
      </div>
      {showJSON && (
        <SchemaViewer
          schema={schema}
          onSave={handleSave}
          onClose={() => setShowJSON(false)}
        />
      )}

      <StepTabs
        steps={schema.steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        addStep={addStep}
      />

      {/* Layout: Palette / Canvas / Config Panel */}
      <div className="row">
        <div className="col-md-3">
          <FieldPalette />
        </div>

        <div className="col-md-6">
          <Canvas
            fields={schema.steps[activeStep]?.fields || []}
            setFields={updateActiveStepFields}
            onSelectField={setSelectedFieldId}
          />
        </div>

        <div className="col-md-3">
          <ConfigPanel
            field={selectedField}
            updateField={updateSelectedField}
            steps={schema.steps}
          />
        </div>
      </div>

      <button className="btn btn-success mt-4" onClick={handleExport}>
        Save Schema
      </button>
    </div>
  );
};

export default FormBuilder;
