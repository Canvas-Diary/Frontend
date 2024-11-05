import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          if (/\.(ttf|otf|woff|woff2|eot)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://api.canvas-diary.kro.kr", // 프록시할 서버 주소
  //       changeOrigin: true, // 필요에 따라 원본의 호스트 헤더를 변경
  //       rewrite: (path) => path.replace(/^\/api/, ""), // 요청 경로에서 '/api'를 제거
  //     },
  //   },
  // },
});
