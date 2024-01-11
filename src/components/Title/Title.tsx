import { useEffect } from "react";

interface TitlePage {
  title: string;
  children: any;
}

function Title({ title, children }: TitlePage) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
}

export default Title;
