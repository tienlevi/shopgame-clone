const Images = (name: any) => {
  return new URL(name, import.meta.url).href;
};

export default Images;
