import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
  build:
    mode === "modal"
      ? {
          lib: {
            entry: path.resolve(__dirname, "src/modal-canvas.tsx"),
            formats: ["iife"],
            name: "InfiniteCanvasModal",
            fileName: "modal-canvas",
          },
          rollupOptions: {
            output: {
              footer: "window.InfiniteCanvasModal = InfiniteCanvasModal;",
            },
          },
        }
      : undefined,
}));
