import React, { useState } from "react";
import FormStepper from "./FormStepper";
import EmailPrompt from "../../components/renderer/EmailPrompt";
import {
  fetchSavedData,
  saveStepData,
} from "../../services/form-renderer.service";
import type { FormSchema } from "../../types/form-schema.type";
import { fetchFormSchema } from "../../services/form-schema.service";

interface Props {
  formId: string;
}

const FormRenderer: React.FC<Props> = ({ formId }) => {
  const [email, setEmail] = useState("");

  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formName, setFormName] = useState<string>("");

  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const loadForm = async (userEmail: string) => {
    setLoading(true);
    setEmail(userEmail);
    await fetchFormSchema(formId)
      .then(async (data: any) => {
        setFormSchema(data.schema);
        setFormName(data.schema.title);
        await fetchSavedData(formId, userEmail)
          .then((res) => {
            setFormData(res.data || {});
            setStepIndex(res.step || 0);
          })
          .catch((error) => {
            console.error("Failed to fetch saved data:", error.message);
          });
      })
      .catch((error: any) => {
        console.log("Failed to load form:", error.message);
        alert(`Failed to load form: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNext = async () => {
    const result = await saveStepData(
      formName,
      formId,
      email,
      formData,
      stepIndex
    );

    if (!result.success) {
      console.warn("Step save failed:", result.error);
      alert(`Could not save progress: ${result.error}`);
      return;
    }

    const isLastStep = stepIndex >= (formSchema?.steps.length || 1) - 1;

    if (!isLastStep) {
      setStepIndex(stepIndex + 1);
    } else {
      console.log("Form data:", formData);

      const event = new CustomEvent("formSubmission", {
        detail: {
          formId,
          email,
          formData,
          completedAt: new Date().toISOString(),
        },
      });

      window.dispatchEvent(event);
      alert("Form completed successfully!");
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
