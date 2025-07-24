import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        builder: path.resolve(__dirname, "src/form-builder-entry.tsx"),
        renderer: path.resolve(__dirname, "src/form-renderer-entry.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
