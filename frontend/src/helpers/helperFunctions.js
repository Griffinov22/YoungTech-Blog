// format date
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleString("en-US", options);
};
