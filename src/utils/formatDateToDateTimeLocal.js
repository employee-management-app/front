import { formatISO9075 } from 'date-fns';

export const formatDateToDateTimeLocal = (date) => {
  if (!date) {
    return null;
  }

  return formatISO9075(new Date(date)).slice(0, -3);
};
