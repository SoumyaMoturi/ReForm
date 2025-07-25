import { axiosInstance } from "./axiosInstance";
import { v4 as uuidv4 } from "uuid";

export type SaveStepResult = {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
};

export const saveStepData = async (
  formName: string,
  formId: string,
  email: string,
  data: Record<string, any>,
  step: number,
  status: string
): Promise<SaveStepResult> => {
  const apiPayload = {
    formName,
    formId,
    email,
    step,
    formData: data,
    status,
  };

  try {
    const response = await axiosInstance.put(
      `/progress/${email}/${formId}`,
      apiPayload
    );

    return {
      success: true,
      status: response.status,
      message: "Progress saved successfully",
    };
  } catch (error: any) {
    console.error("Failed to save progress:", error.message);

    return {
      success: false,
      status: error?.response?.status || 500,
      error:
        error?.response?.data?.message ||
        error.message ||
        "Progress save failed",
    };
  }
};

export const fetchSavedData = async (
  formId: string,
  email: string
): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/progress/${email}/${formId}`);

    const serverData = response.data;

    return {
      data: serverData.formData || {},
      step: parseInt(serverData.step?.split("_")?.[1] || "0", 10),
      savedAt: serverData.savedAt || new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Failed to fetch progress:", error.message);

    return {
      data: {},
      step: 0,
      savedAt: new Date().toISOString(),
    };
  }
};

export type UploadResponse = {
  fileName: string;
  fileLoc: string;
  status: number;
};

export const uploadDocument = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  const fileId = uuidv4();
  formData.append("file", file);
  formData.append("fileName", file.name);

  try {
    const response = await axiosInstance.post(
      `/progress/document/${fileId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      fileName: response.data.fileName,
      fileLoc: response.data?.fileLoc,
      status: response.status,
    };
  } catch (error: any) {
    console.error("Document upload failed:", error.message);
    throw new Error(error?.response?.data?.message || "Upload failed");
  }
};
