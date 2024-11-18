import { create } from "zustand";

interface DarkModeState {
  dark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  dark: JSON.parse(localStorage.getItem("darkMode") || "false"), // 초기값은 localStorage에서 가져옴
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.dark;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode)); // 상태 변경 시 localStorage에 저장
      return { dark: newDarkMode };
    }),
}));
