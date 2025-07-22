import React from "react";
import axios from "axios";
import type { FormFieldType } from "../../../types/form-schema.type";

interface Props {
  field: FormFieldType;
  value: string; // assume API returns a URL or ID
  onChange: (val: string) => void;
}

const FileUpload: React.FC<Props> = ({ field, value, onChange }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      //   const res = await axios.post("/api/upload", formData);
      //   onChange(res.data);

      const response = {
        fileName: file.name,
        fileSize: file.size,
        fileLoc: `/uploads/${file.name}`, // simulate path
      };

      onChange(response);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload error");
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={field.id} className="form-label">
        {field.label}
      </label>
      <input
        type="file"
        id={field.id}
        className="form-control"
        required={field.required}
        onChange={handleUpload}
      />
      {value && <small className="text-success d-block mt-1">✔ Uploaded</small>}
    </div>
  );
};

export default FileUpload;
