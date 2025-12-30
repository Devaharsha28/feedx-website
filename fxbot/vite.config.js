import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    server: {
        host: "0.0.0.0",
        port: 8080,
        strictPort: true,
        allowedHosts: true,
        open: false,
    },
    preview: {
        host: true,
        port: 8080,
        allowedHosts: true,
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
