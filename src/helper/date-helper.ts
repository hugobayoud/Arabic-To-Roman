// not mine, source : https://gomakethings.com/how-to-check-if-a-date-is-valid-with-vanilla-javascript/

/**
 * Get the number of days in any particular month
 * @param  {integer} m The month (valid: 0-11)
 * @param  {integer} y The year
 * @return {integer}   The number of days in the month
 */
function daysInMonth(m: number, y: number): number {
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
}

/**
 * Check if a date is valid
 * @param  {[type]}  d The day
 * @param  {[type]}  m The month
 * @param  {[type]}  y The year
 * @return {Boolean} Returns true if valid
 */
function isValidDate(d, m, y): boolean {
  m = parseInt(m, 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

export { daysInMonth };
export { isValidDate };
