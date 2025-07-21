
import FormBuilder from "../pages/FormBuilder/FormBuilder";
export interface AppRoute {
  path: string;
  element: React.ReactNode;
  label?: string;
  protected?: boolean;
}

export const routesConfig: AppRoute[] = [
  { path: '/', element: <FormBuilder />, label: 'Home' },

];