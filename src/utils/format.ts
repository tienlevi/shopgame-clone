export const formatDate = (date: string) => {
  const format = new Date(date);
  return format.toLocaleString();
};
