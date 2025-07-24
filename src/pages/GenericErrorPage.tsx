import React from "react";
import { useNavigate } from "react-router-dom";

const GenericErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="display-5">Oops! Something went wrong.</h1>
        <p className="lead">
          {message || "We couldn't load the page or complete your request."}
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={() => navigate(0)}>
          Retry
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default GenericErrorPage;
