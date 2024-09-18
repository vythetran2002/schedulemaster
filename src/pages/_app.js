import "@/styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
import { useDarkMode } from "@/hooks/useDarkMode";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <main className={`${roboto.className} ${darkMode ? "dark" : ""}`}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
}
