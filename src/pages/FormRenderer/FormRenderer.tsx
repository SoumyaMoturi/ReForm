import React, { useState } from "react";
import FormStepper from "./FormStepper";
import EmailPrompt from "../../components/renderer/EmailPrompt";
import { saveStepData } from "../../services/form-renderer.service";
import { useSearchParams } from "react-router-dom";
import type { FormSchema } from "../../types/form-schema.type";
import { fetchFormSchema } from "../../services/form-schema.service";

const FormRenderer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [params] = useSearchParams();
  const formName = params.get("formName") || "";
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const loadForm = async (userEmail: string) => {
    setLoading(true);
    const data = await fetchFormSchema(formName, userEmail);
    setFormSchema(data.schema);
    setFormData(data.savedData || {});
    setStepIndex(data.lastStep || 0);
    setEmail(userEmail);
    setLoading(false);
  };

  const handleNext = async () => {
    await saveStepData(formName, email, formData, stepIndex);

    const isLastStep = stepIndex >= (formSchema?.steps.length || 1) - 1;

    if (!isLastStep) {
      setStepIndex(stepIndex + 1);
    } else {
      console.log("Form data:", formData);

      const event = new CustomEvent("formSubmission", {
        detail: {
          formName,
          email,
          formData,
          completedAt: new Date().toISOString(),
        },
      });
      window.dispatchEvent(event);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (!formSchema) return <EmailPrompt onSubmit={loadForm} />;

  return (
    <div className="container py-4">
      {/* Form Title */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold">{formSchema.title}</h2>
      </div>

      {/* Form Stepper */}
      <div className="bg-light p-4 rounded shadow-sm">
        <FormStepper
          step={formSchema.steps[stepIndex]}
          formData={formData}
          setFormData={setFormData}
          stepIndex={stepIndex}
          totalSteps={formSchema.steps.length}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={handlePrev}
          disabled={stepIndex === 0}
        >
          ← Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          {stepIndex < formSchema.steps.length - 1 ? "Next →" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default FormRenderer;
