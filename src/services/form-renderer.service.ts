import axios from "axios";
import type { FormSchema } from "../types/form-schema.type";

// export const fetchFormSchema = async (formName: string, email: string) => {
//   const res = await axios.post("/api/form/load", { formName, email });
//   return res.data as {
//     schema: FormSchema;
//     savedData: Record<string, any>;
//     lastStep: number;
//   };
// };

// export const saveStepData = async (
//   formName: string,
//   email: string,
//   data: Record<string, any>,
//   step: number
// ) => {
//   await axios.post("/api/form/save", { formName, email, data, step });
// };

export const saveStepData = async (
  formName: string,
  email: string,
  data: Record<string, any>,
  step: number
) => {
  const key = `${formName}_${email}_progress`;

  const payload = {
    data,
    step,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(key, JSON.stringify(payload));
};
