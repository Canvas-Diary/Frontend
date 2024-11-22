import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import GlobalFallback from "./components/fallback/GlobalFallback";
import { useEffect } from "react";
import { useDarkModeStore } from "./global/globalState";

function App() {
  const { dark } = useDarkModeStore();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return <RouterProvider router={router} fallbackElement={<GlobalFallback />} />;
}

export default App;
