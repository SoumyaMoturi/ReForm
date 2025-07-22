import React, { useState, useEffect } from "react";
import type { FormSchema } from "../../types/form-schema.type";

interface JsonViewerModalProps {
  schema: FormSchema;
  onSave: (schema: FormSchema) => void;
  onClose: () => void;
}

const SchemaViewer: React.FC<JsonViewerModalProps> = ({
  schema,
  onSave,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const JsonViewer: React.FC<{ data: any; level?: number }> = ({
    data,
    level = 0,
  }) => {
    const [expanded, setExpanded] = useState(true);
    const isObject = typeof data === "object" && data !== null;

    return (
      <div
        style={{
          paddingLeft: `${level * 12}px`,
          borderLeft: level > 0 ? "1px solid #eee" : "none",
          marginBottom: "4px",
        }}
      >
        {isObject ? (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              aria-label="Toggle node"
              style={{
                marginRight: 6,
                fontSize: "0.8rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {expanded ? "▾" : "▸"}
            </button>
            <span style={{ fontWeight: 500 }}>
              {Array.isArray(data) ? "[Array]" : "{Object}"}
            </span>
            {expanded && (
              <div style={{ marginTop: 2 }}>
                {Object.entries(data).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: "2px" }}>
                    <strong>{key}:</strong>{" "}
                    <JsonViewer data={value} level={level + 1} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <span>{JSON.stringify(data)}</span>
        )}
      </div>
    );
  };

  return (
    <div
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
          ×
        </button>
        <h3 style={{ marginBottom: "0.75rem" }}>🔍 JSON Schema Preview</h3>
        <div style={styles.content}>
          <JsonViewer data={schema} />
          <div style={{ textAlign: "right", marginTop: "1.2rem" }}>
            <button className="btn btn-success" onClick={() => onSave(schema)}>
              💾 Save Schema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fefefe",
    padding: "1.5rem",
    borderRadius: "8px",
    width: "75%",
    maxHeight: "80vh",
    overflowY: "auto" as const,
    position: "relative" as const,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  closeBtn: {
    position: "absolute" as const,
    top: "10px",
    right: "14px",
    fontSize: "1.2rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  content: {
    paddingTop: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.4",
  },
};

export default SchemaViewer;
