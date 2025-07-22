import React from "react";
import FormField from "../../components/formFields/FormField";
import type { Step } from "../../types/form-schema.type";
import { useConditional } from "../../hooks/useConditional";

interface Props {
  step: Step;
  formData: Record<string, any>;
  setFormData: (newData: Record<string, any>) => void;
  stepIndex: number;
  totalSteps: number;
}

const ConditionalField: React.FC<{
  field: any;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
}> = ({ field, formData, setFormData }) => {
  const show = useConditional(field, formData);

  const handleChange = (id: string, value: any) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return show ? (
    <FormField
      field={field}
      value={formData[field.id]}
      onChange={handleChange}
    />
  ) : null;
};

const FormStepper: React.FC<Props> = ({
  step,
  formData,
  setFormData,
  stepIndex,
  totalSteps,
}) => {
  return (
    <div className="container my-4 p-4 border rounded bg-light shadow-sm">
      {/* Stepper Indicator */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <div className="progress flex-grow-1 mx-3" style={{ height: "6px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${(stepIndex / totalSteps) * 100}%` }}
              aria-valuenow={stepIndex + 1}
              aria-valuemin={0}
              aria-valuemax={totalSteps}
            />
          </div>
        </div>
      </div>

      {/* Step Title */}
      {/* <h4 className="mb-3 fw-semibold text-primary">{step.title}</h4> */}

      {/* Dynamic Fields */}
      {step.fields.map((field) => (
        <ConditionalField
          key={field.id}
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
    </div>
  );
};

export default FormStepper;
