export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours()+':' + time.getMinutes() + ":00";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); //  getDate = day of month    getDay = day of week
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + ' ' + timeString);
};
