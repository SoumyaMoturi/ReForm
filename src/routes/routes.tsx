import FormBuilder from "../pages/FormBuilder/FormBuilder";
import FormRenderer from "../pages/FormRenderer/FormRenderer";
export interface AppRoute {
  path: string;
  element: React.ReactNode;
  label?: string;
  protected?: boolean;
}

export const routesConfig: AppRoute[] = [
  { path: "/form-builder", element: <FormBuilder />, label: "builder" },
  { path: "/form-renderer", element: <FormRenderer />, label: "renderer" },
];
