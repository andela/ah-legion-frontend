const unixTimeToDate = (dbField) => {
  const updatedTime = new Date(dbField);
  const date = updatedTime.toDateString();
  return date;
};
export default unixTimeToDate;
