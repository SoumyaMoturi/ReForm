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
    <form onSubmit={handleSubmit}>
      <h3>Enter your email to start or resume:</h3>
      <input
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Load Form</button>
    </form>
  );
};

export default EmailPrompt;
