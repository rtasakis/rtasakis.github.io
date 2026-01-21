import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/input.css";
import App from "./App";
import SvgLogoMotionIntro from "./components/playground/SvgLogoMotionIntro";

function Root() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <App />

      {showIntro && (
        <>
          {/* black underlay so the slide-out never reveals white */}
          <div className="fixed inset-0 z-[9998] bg-black" />
          <SvgLogoMotionIntro onComplete={() => setShowIntro(false)} />
        </>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
