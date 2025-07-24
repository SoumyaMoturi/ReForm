import ReactDOM from "react-dom/client";
import FormRenderer from "./pages/FormRenderer/FormRenderer";

class FormRendererElement extends HTMLElement {
  connectedCallback() {
    const formId = this.getAttribute("form-id") || "default";
    const root = ReactDOM.createRoot(this);
    root.render(<FormRenderer formId={formId} />);
  }
}

customElements.define("form-renderer", FormRendererElement);
