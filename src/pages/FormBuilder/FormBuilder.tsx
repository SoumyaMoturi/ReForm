import React, { useState } from "react";
import FieldPalette from "./FieldPalette";
import StepTabs from "./StepTabs";
import Canvas from "./Canvas";
import ConfigPanel from "./ConfigPanel";
import type { FormFieldType, FormSchema } from "../../types/form-schema.type";
import { saveFormSchema } from "../../services/form-schema.service";
import SchemaViewer from "../../components/builder/SchemaViewer";

const FormBuilder: React.FC = () => {
  const [formTitle, setFormTitle] = useState("Untitled");
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
    const formId = formTitle.toLowerCase().replace(/\s+/g, "_");
    const exportSchema = {
      ...schema,
      title: formTitle,
    };

    try {
      const result = await saveFormSchema(formId, exportSchema);

      if (result.success && result.status === 200) {
        alert(result.message || "Schema saved successfully!");
        console.log("Schema saved for:", formId);
      } else {
        const errorMsg =
          result.error || `Save failed with status ${result.status}`;
        console.warn("Save operation failed:", errorMsg);
        alert(`Save failed: ${errorMsg}`);
      }
    } catch (err: any) {
      const fallbackMessage =
        err?.message || "Unexpected error occurred during save";
      console.error("Unhandled exception:", err);
      alert(`Save failed: ${fallbackMessage}`);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">🛠️ Form Builder</h2>

      <div className="mb-4 p-3 border rounded bg-light">
        <label htmlFor="formTitle" className="form-label fw-bold text-primary">
          Form Title
        </label>

        <div className="d-flex align-items-start">
          <input
            id="formTitle"
            className="form-control me-3"
            style={{ height: "60px", fontSize: "1.25rem" }}
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
              setSchema((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          <button className="btn btn-success" onClick={handleExport}>
            💾 Save
          </button>
        </div>
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
    </div>
  );
};

export default FormBuilder;
