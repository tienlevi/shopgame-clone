import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop(props: any) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return props.children;
}

export default ScrollToTop;
