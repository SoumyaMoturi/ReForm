import React from "react";
import type { Step } from "../../types/form-schema.type";

type Props = {
  steps: Step[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  addStep: () => void;
};

const StepTabs: React.FC<Props> = ({
  steps,
  activeStep,
  setActiveStep,
  addStep,
}) => {
  return (
    <div className="mb-3">
      <ul className="nav nav-tabs">
        {steps.map((step, i) => (
          <li className="nav-item" key={i}>
            <button
              className={`nav-link ${i === activeStep ? "active" : ""}`}
              onClick={() => setActiveStep(i)}
            >
              {step.title || `Step ${i + 1}`}
            </button>
          </li>
        ))}
        <li className="nav-item">
          <button className="nav-link text-success" onClick={addStep}>
            ➕ Add Step
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StepTabs;
