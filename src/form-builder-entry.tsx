import ReactDOM from "react-dom/client";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

class BuilderElement extends HTMLElement {
  connectedCallback() {
    const root = ReactDOM.createRoot(this);
    root.render(<FormBuilder />);
  }
}

customElements.define("form-builder", BuilderElement);
