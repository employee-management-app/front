const prepareCell = (date, dayNumber, type) => ({
  label: String(dayNumber),
  value: date
    .clone()
    .set('date', dayNumber)
    .set('h', 0)
    .set('m', 0)
    .set('s', 0)
    .set('ms', 0),
  type,
});

export const getCalendarCells = (date) => {
  const daysInMonth = date.daysInMonth();
  const calendarCells = [];

  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(date, i + 1, 'current'));
  }

  const cellsToAdd = 35 - daysInMonth;

  const lastMonth = date.subtract(1, 'month');

  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i, 'prev'));
  }

  const nextMonth = date.add(1, 'month');

  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1, 'next'));
  }

  calendarCells.unshift(...['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => ({
    label: day,
    type: 'day',
  })));

  return calendarCells;
};
