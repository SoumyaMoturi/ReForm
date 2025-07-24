import FormBuilder from "../pages/FormBuilder/FormBuilder";
import FormRendererRouteWrapper from "../pages/FormRenderer/FormRendererRouteWrapper";
import GenericErrorPage from "../pages/GenericErrorPage";
import Home from "../pages/HomePage";
export interface AppRoute {
  path: string;
  element: React.ReactNode;
  label?: string;
  protected?: boolean;
}

export const routesConfig: AppRoute[] = [
  { path: "/", element: <Home />, label: "home" },
  { path: "/form-builder", element: <FormBuilder />, label: "builder" },
  {
    path: "/form-renderer/:formId",
    element: <FormRendererRouteWrapper />,
    label: "renderer",
  },
  { path: "/generic-error", element: <GenericErrorPage />, label: "error" },
];
