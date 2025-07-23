import React from "react";
import type { FormFieldType, Step } from "../../types/form-schema.type";

type Props = {
  field: FormFieldType | null;
  updateField: (field: FormFieldType) => void;
  steps: Step[];
};

const ConfigPanel: React.FC<Props> = ({ field, updateField, steps }) => {
  if (!field)
    return <div className="text-muted">Select a field to configure</div>;

  const handleChange = (key: keyof FormFieldType, value: any) => {
    updateField({ ...field, [key]: value });
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">⚙️ Field Configuration</h5>

      {/* Label */}
      <div className="mb-3">
        <label className="form-label">Label</label>
        <input
          className="form-control"
          value={field.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
      </div>

      {/* ID */}
      <div className="mb-3">
        <label htmlFor="fieldId" className="form-label">
          Field ID
        </label>
        <input
          type="text"
          id="fieldId"
          className={`form-control`}
          value={field.id}
          onChange={(e) => handleChange("id", e.target.value)}
          disabled
        />

        <div className="form-text text-muted">
          Unique identifier used in formData
        </div>
      </div>

      {/* Placeholder */}
      <div className="mb-3">
        <label className="form-label">Placeholder</label>
        <input
          className="form-control"
          value={field.placeholder || ""}
          onChange={(e) => handleChange("placeholder", e.target.value)}
        />
      </div>

      {/* Required */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={field.required || false}
          onChange={(e) => handleChange("required", e.target.checked)}
          id="requiredToggle"
        />
        <label className="form-check-label" htmlFor="requiredToggle">
          Required
        </label>
      </div>

      {/* Field-specific settings */}
      {["select", "radio"].includes(field.type) && (
        <div className="mb-3">
          <label className="form-label">Options (comma separated)</label>
          <input
            className="form-control"
            value={field.options?.join(", ") || ""}
            onChange={(e) =>
              handleChange(
                "options",
                e.target.value.split(",").map((opt) => opt.trim())
              )
            }
          />
        </div>
      )}

      {field.type === "select" && (
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={field.multiple || false}
            onChange={(e) => handleChange("multiple", e.target.checked)}
            id="multipleToggle"
          />
          <label className="form-check-label" htmlFor="multipleToggle">
            Allow Multiple Selections
          </label>
        </div>
      )}

      {field.type === "file" && (
        <>
          <div className="mb-3">
            <label className="form-label">
              Accepted Types (comma-separated MIME types)
            </label>
            <input
              className="form-control"
              value={(field.options || []).join(", ")}
              onChange={(e) =>
                handleChange(
                  "options",
                  e.target.value.split(",").map((opt) => opt.trim())
                )
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Max File Size (MB)</label>
            <input
              type="number"
              className="form-control"
              value={(field.validation?.maxLength as number) || ""}
              onChange={(e) =>
                handleChange("validation", {
                  ...field.validation,
                  maxLength: parseInt(e.target.value, 10),
                })
              }
            />
          </div>
        </>
      )}

      {/* Conditional Logic */}
      <hr />
      <h6 className="mt-3">🧠 Conditional Logic</h6>
      <div className="mb-2">
        <label className="form-label">Show If Field Equals</label>
        <select
          className="form-select mb-2"
          value={field.conditional?.field || ""}
          onChange={(e) =>
            handleChange("conditional", {
              ...(field.conditional || {}),
              field: e.target.value,
            })
          }
        >
          <option value="">None</option>
          {steps
            .flatMap((step) => step.fields)
            .filter((f) => f.id !== field.id) // to avoid self-reference
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.label} ({f.id})
              </option>
            ))}
        </select>
        <input
          className="form-control"
          placeholder="Trigger Value"
          value={String(field.conditional?.value ?? "")}
          onChange={(e) =>
            handleChange("conditional", {
              ...(field.conditional || {}),
              value: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default ConfigPanel;
