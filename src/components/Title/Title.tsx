interface TitlePage {
  title: string;
  children: any;
}

function Title({ title, children }: TitlePage) {
  document.title = title;

  return <>{children}</>;
}

export default Title;
