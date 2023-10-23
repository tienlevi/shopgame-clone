import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
function Onload() {
  const body = useLocation();
  const bodyHeader = document.querySelector("body");
  bodyHeader?.classList.remove("overflow-hidden");

  useLayoutEffect(() => {
    window.onload = () => {
      return body;
    };
  }, [body]);

  return null;
}

export default Onload;
