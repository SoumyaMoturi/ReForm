import { useParams } from "react-router-dom";
import FormRenderer from "./FormRenderer";

const FormRendererRouteWrapper = () => {
  const { formId = "default" } = useParams();
  return <FormRenderer formId={formId} />;
};

export default FormRendererRouteWrapper;
