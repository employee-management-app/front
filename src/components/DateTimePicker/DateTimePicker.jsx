import React from 'react';
import dayjs from 'dayjs';

import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

import { Input } from '../Input';
import { Popover } from '../Popover';

import { Calendar } from './Calendar';
import styles from './DateTimePicker.module.scss';

const getDefaultValue = (value, rangeMode) => {
  if (rangeMode) {
    return (value || [null, null]).map((date) => (date ? dayjs(date) : null));
  }

  return value ? dayjs(value) : null;
};

const getDefaultVisibleDate = (value, rangeMode) => {
  const normalizedValue = (rangeMode && value) ? value[0] : value;

  return dayjs(normalizedValue || new Date());
};

export const DateTimePicker = ({ value, placeholder, size, rangeMode, onChange }) => {
  const [selectedDate, setSelectedDate] = React.useState(getDefaultValue(value, rangeMode));
  const [visibleDate, setVisibleDate] = React.useState(getDefaultVisibleDate(value, rangeMode));
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const showPopover = React.useCallback(() => {
    setIsPopoverVisible(true);
  }, []);

  const handleClear = React.useCallback(() => {
    setSelectedDate(rangeMode ? [null, null] : null);
    setVisibleDate(dayjs());
    onChange?.(rangeMode ? [null, null] : null);
  }, [onChange, rangeMode]);

  const handleChange = React.useCallback((date) => {
    setSelectedDate(date);

    if (!rangeMode) {
      setVisibleDate(date);
      onChange?.(date.toDate());

      return;
    }

    const [start, end] = date;

    setVisibleDate((end && end.isSame(selectedDate[0])) ? start : (end || start));
    onChange?.([start.toDate(), end ? end.toDate() : null]);
  }, [onChange, rangeMode, selectedDate]);

  const handleVisibleDateChange = React.useCallback((date) => () => {
    setVisibleDate(date);
  }, []);

  const displayValue = React.useMemo(() => {
    if (!rangeMode) {
      return selectedDate?.format('DD.MM.YYYY');
    }

    const [start, end] = selectedDate;

    if (!start) {
      return '';
    }

    if (rangeMode === 'time') {
      return `${start.format('DD.MM.YYYY HH:mm')}-${end?.format('HH:mm') ?? ''}`;
    }

    return `${start.format('DD.MM.YYYY')} - ${end?.format('DD.MM.YYYY') || ''}`;
  }, [rangeMode, selectedDate]);

  return (
    <div className={styles.field}>
      <Popover
        visible={isPopoverVisible}
        content={(
          <Calendar
            visibleDate={visibleDate}
            selectedDate={selectedDate}
            rangeMode={rangeMode}
            onChange={handleChange}
            onVisibleDateChange={handleVisibleDateChange}
          />
        )}
        className={styles.popover}
        onVisibleChange={setIsPopoverVisible}
      >
        <Input
          value={displayValue}
          placeholder={placeholder}
          size={size}
          icon={CalendarIcon}
          clearable
          frozen
          onClear={handleClear}
          onFocus={showPopover}
        />
      </Popover>
    </div>
  );
};
