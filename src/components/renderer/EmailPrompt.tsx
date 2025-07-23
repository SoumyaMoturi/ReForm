import React, { useState } from "react";

interface Props {
  onSubmit: (email: string) => void;
}

const EmailPrompt: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) onSubmit(email);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="mb-3 text-primary fw-semibold">🔐 Access Your Form</h4>
        <p className="text-muted mb-4">
          Enter your email address to start or resume filling out your form.
        </p>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            placeholder="you@example.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Load Form
        </button>
      </form>
    </div>
  );
};

export default EmailPrompt;
