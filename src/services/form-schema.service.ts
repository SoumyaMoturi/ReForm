import type { FormSchema } from "../types/form-schema.type";
import { fetchSavedData } from "./form-renderer.service";

// export const fetchFormSchema = async (formName: string, email: string) => {
//   const res = await axios.post("/api/form/load", { formName, email });
//   return res.data as {
//     schema: FormSchema;
//     savedData: Record<string, any>;
//     lastStep: number;
//   };
// };

export const fetchFormSchema = async (formName: string, email: string) => {
  const res = await fetch(`/form-schemas/accountCreation.json`);

  if (!res.ok) {
    throw new Error(`Failed to load ${formName}.json from /public/forms`);
  }

  const schema = await res.json();
  const result = fetchSavedData(formName, email) ?? {
    data: {},
    step: 0,
    savedAt: new Date().toISOString(),
  };

  return {
    schema,
    savedData: result?.data || {},
    lastStep: result?.step,
  };
};

// export async function saveFormSchema(
//   formId: string,
//   formName: string,
//   schema: FormSchema
// ) {
//   const response = await fetch("https://your-api-endpoint.com/forms", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       formId,
//       formName,
//       schema,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to save schema: ${response.statusText}`);
//   }

//   return await response.json();
// }

export async function saveFormSchema(
  formId: string,
  formName: string,
  schema: FormSchema
) {
  const blob = new Blob([JSON.stringify(schema, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${formName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Cleanup
}
