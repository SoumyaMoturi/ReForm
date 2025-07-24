import React from "react";
import type { FormFieldType } from "../../../types/form-schema.type";
import { uploadDocument } from "../../../services/form-renderer.service";

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (val: string) => void;
}

const FileUpload: React.FC<Props> = ({ field, value, onChange }) => {
  const [error, setError] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response: any = await uploadDocument(file);
      const { fileName, fileLoc } = response;
      onChange({ fileLoc, fileName } as any);
      setError(false);
    } catch (err) {
      console.log("Upload failed:", err);
      setError(true);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onChange({} as any);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={field.id} className="form-label">
        {field.label}
      </label>
      <input
        ref={inputRef}
        type="file"
        id={field.id}
        className="form-control"
        required={field.required}
        onChange={handleUpload}
      />
      {error ? (
        <small className="text-danger d-block mt-1">Upload Failed</small>
      ) : (
        value && <small className="text-success d-block mt-1">✔ Uploaded</small>
      )}
    </div>
  );
};

export default FileUpload;
