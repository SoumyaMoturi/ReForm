import ReactDOM from "react-dom/client";
import FormRenderer from "./pages/FormRenderer/FormRenderer";

class FormRendererElement extends HTMLElement {
  formId: string;
  root: ReactDOM.Root;
  static get observedAttributes() {
    return ["form-id"];
  }

  constructor() {
    super();
    this.root = ReactDOM.createRoot(this);
    this.formId = this.getAttribute("form-id") || "";
  }

  connectedCallback() {
    this.renderReactComponent();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: string) {
    if (name === "form-id" && oldValue !== newValue) {
      this.formId = newValue;
      this.renderReactComponent();
    }
  }

  renderReactComponent() {
    this.root.render(<FormRenderer formId={this.formId} />);
  }
}

customElements.define("form-renderer", FormRendererElement);
