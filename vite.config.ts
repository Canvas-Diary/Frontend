import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
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
