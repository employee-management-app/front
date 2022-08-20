import cx from 'classnames';
import React from 'react';

import { getTimeOptions, changeDateMonth, getCalendarCells, getIsDateBeetwen } from './helpers';
import { CalendarArrow } from './CalendarArrow';
import styles from './DateTimePicker.module.scss';

export const Calendar = ({ visibleDate, selectedDate, rangeMode, onChange, onVisibleDateChange }) => {
  const [hoveredCells, setHoveredCells] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState(selectedDate);

  const cells = getCalendarCells(visibleDate);

  const timeOptions = React.useMemo(() => {
    if (!rangeMode) {
      return getTimeOptions(selectedDate || visibleDate);
    }

    const [start, end] = selectedDate;

    return getTimeOptions(end || start || visibleDate);
  }, [rangeMode, selectedDate, visibleDate]);

  const handleSelectDate = React.useCallback((date) => () => {
    if (!rangeMode) {
      onChange(date);

      return;
    }

    if (rangeMode === 'time') {
      onChange([date, date]);

      return;
    }

    const [start, end] = selectedDate;

    if (end) {
      setHoveredCells([]);
    }

    if ((start && end) || (!start && !end)) {
      onChange([date, null]);

      return;
    }

    onChange(date.isAfter(start) ? [start, date] : [date, start]);
  }, [onChange, rangeMode, selectedDate]);

  const handleSelectTime = React.useCallback((date) => () => {
    if (!rangeMode) {
      onChange(date);

      return;
    }

    const [, end] = selectedDate;
    const [timeStart, timeEnd] = selectedTime;

    if (end) {
      setHoveredCells([]);
    }

    if ((timeStart && timeEnd) || (!timeStart && !timeEnd)) {
      // eslint-disable-next-line newline-per-chained-call
      onChange([
        date,
        end
          .clone()
          .set('h', 0)
          .set('m', 0)
          .set('s', 0)
          .set('ms', 0),
      ]);
      setSelectedTime([date, null]);

      return;
    }

    const value = date.isAfter(timeStart) ? [timeStart, date] : [date, timeStart];

    onChange(value);
    setSelectedTime(value);
  }, [onChange, rangeMode, selectedDate, selectedTime]);

  const getIsDateSelected = React.useCallback((date) => {
    if (!rangeMode) {
      return date.isSame(selectedDate, 'day');
    }

    const [start, end] = selectedDate;

    return date.isSame(start, 'day') || date.isSame(end, 'day');
  }, [rangeMode, selectedDate]);

  const getIsTimeSelected = React.useCallback((time) => {
    if (!rangeMode) {
      return time.isSame(selectedDate);
    }

    const [start, end] = selectedTime;

    return time.isSame(start) || time.isSame(end);
  }, [rangeMode, selectedDate, selectedTime]);

  React.useEffect(() => {
    if (rangeMode === 'time' && !selectedDate[1]) {
      setSelectedTime([null, null]);
    }
  }, [selectedDate]);

  React.useLayoutEffect(() => {
    if (!rangeMode) {
      return;
    }

    const [start, end] = (rangeMode === 'time' ? selectedTime : selectedDate);

    if (start && end) {
      setHoveredCells(
        (rangeMode === 'time' ? timeOptions : cells)
          .filter(({ value }) => getIsDateBeetwen(value, start, end))
          .map(({ value }) => value)
      );
    }
  }, [visibleDate]);

  const handleMouseOver = React.useCallback((hoveredValue) => () => {
    if (!rangeMode) {
      return;
    }

    const [start, end] = (rangeMode === 'time' ? selectedTime : selectedDate);

    if (start && !end) {
      setHoveredCells(
        (rangeMode === 'time' ? timeOptions : cells)
          .filter(({ value }) => getIsDateBeetwen(value, start, hoveredValue))
          .map(({ value }) => value)
      );
    }
  }, [cells, rangeMode, selectedDate, selectedTime, timeOptions]);

  const handleMouseLeave = React.useCallback(() => {
    if (!rangeMode) {
      return;
    }

    const [, end] = (rangeMode === 'time' ? selectedTime : selectedDate);

    if (!end) {
      setHoveredCells([]);
    }
  }, [rangeMode, selectedDate, selectedTime]);

  const getIsInRange = (date) => hoveredCells.some((value) => value.isSame(date));

  const getIsFirstInRange = (date) => {
    if (!rangeMode) {
      return false;
    }

    const [start, end] = selectedDate;

    if (end) {
      return date?.isSame(start, 'day');
    }

    const isStartVisible = !hoveredCells.every((value) => !value.isSame(start, 'day'));
    const first = cells.find(({ type }) => type !== 'day').value;
    const firstHovered = hoveredCells[0];

    if (firstHovered?.isSame(first, 'day') && !isStartVisible) {
      return false;
    }

    return hoveredCells[0]?.isSame(date, 'day');
  };

  const getIsLastInRange = (date) => {
    if (!rangeMode) {
      return false;
    }

    const [start, end] = selectedDate;

    if (end) {
      return date?.isSame(end, 'day');
    }

    const isStartVisible = !hoveredCells.every((value) => !value.isSame(start, 'day'));
    const last = [...cells].reverse().find(({ type }) => type !== 'day').value;
    const lastHovered = hoveredCells[hoveredCells.length - 1];

    if (lastHovered?.isSame(last, 'day') && !isStartVisible) {
      return false;
    }

    return lastHovered?.isSame(date, 'day');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.date}>
            {visibleDate.format('MMMM')} {visibleDate.format('YYYY')}
          </div>
          <div className={styles.arrows}>
            <CalendarArrow onClick={onVisibleDateChange(changeDateMonth(visibleDate))} />
            <CalendarArrow onClick={onVisibleDateChange(changeDateMonth(visibleDate, true))} />
          </div>
        </div>
        <div className={styles.grid}>
          {cells.map(({ label, value, type }) => (type === 'day'
            ? <div key={label} className={styles.cell}>{label}</div>
            : (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                key={value.toString()}
                className={cx(styles.cell, {
                  [styles.inRange]: getIsInRange(value),
                  [styles.firstInRange]: getIsFirstInRange(value),
                  [styles.lastInRange]: getIsLastInRange(value),
                })}
                onMouseOver={handleMouseOver(value)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={cx(styles.cellButton, {
                    [styles.current]: type === 'current',
                    [styles.selected]: getIsDateSelected(value),
                  })}
                  onClick={handleSelectDate(value)}
                >
                  {label}
                </button>
              </div>
            )
          ))}
        </div>
      </div>
      {rangeMode === 'time' && (
        <div className={styles.time}>
          <div className={styles.timeOptions}>
            {timeOptions.map(({ label, value }) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <button
                key={label}
                type="button"
                disabled={!selectedDate[1]}
                className={cx(styles.timeButton, {
                  [styles.selected]: getIsTimeSelected(value),
                  [styles.inRange]: getIsInRange(value),
                })}
                onMouseOver={handleMouseOver(value)}
                onMouseLeave={handleMouseLeave}
                onClick={handleSelectTime(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
