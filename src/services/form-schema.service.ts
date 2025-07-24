import type { FormSchema } from "../types/form-schema.type";
import { axiosInstance } from "./axiosInstance";

export const fetchFormSchema = async (formId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get<any>(`/forms/schemas/${formId}`);

    return {
      success: true,
      status: response.status,
      schema: response.data,
    };
  } catch (error: any) {
    console.error(`Schema fetch failed for ${formId}:`, error.message);
    return {
      success: false,
      status: error?.response?.status || 500,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Schema fetch failed",
    };
  }
};

export type SaveSchemaResult = {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
};

export async function saveFormSchema(
  formId: string,
  schema: FormSchema
): Promise<SaveSchemaResult> {
  try {
    const response = await axiosInstance.post(
      `/forms/schemas/${formId}`,
      schema
    );

    return {
      success: true,
      status: response.status,
      message: "Schema saved successfully",
    };
  } catch (error: any) {
    console.error(`Failed to save schema for ${formId}:`, error.message);
    return {
      success: false,
      status: error?.response?.status || 500,
      error:
        error?.response?.data?.message || error.message || "Schema save failed",
    };
  }
}
