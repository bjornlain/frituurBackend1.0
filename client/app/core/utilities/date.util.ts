export const datesAreOnTheSameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

export const datesAreOnTheSameMonth = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();

export const getWeekOfTheYear = (dateinput: Date) => {
  // clone date
  const date = new Date(dateinput);

  // ISO week date weeks start on Monday, so correct the day number
  const nDay = (date.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week with the first Thursday of that year
  // Set the target date to the Thursday in the target week
  date.setDate(date.getDate() - nDay + 3);

  // Store the millisecond value of the target date
  const n1stThursday = date.valueOf();

  // Set the target to the first Thursday of the year
  // First, set the target to January 1st
  date.setMonth(0, 1);

  // Not a Thursday? Correct the date to the next Thursday
  if (date.getDay() !== 4) {
    date.setMonth(0, ((4 - date.getDay() + 7) % 7) + 1);
  }

  // The week number is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
  return Math.ceil((+n1stThursday - +date) / 604800000) + 1;
};

export const minutesToHHmmSS = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = Math.floor(mins - (hours * 3600) / 60);
  const seconds = Math.floor(mins * 60 - hours * 3600 - minutes * 60);

  let hourString = hours.toString();
  let minString = minutes.toString();
  let secString = seconds.toString();

  // Appends 0 when unit is less than 10
  if (hours < 10) {
    hourString = `0${hours}`;
  }
  if (minutes < 10) {
    minString = `0${minutes}`;
  }
  if (seconds < 10) {
    secString = `0${seconds}`;
  }

  return `${hourString}:${minString}:${secString}`;
};
