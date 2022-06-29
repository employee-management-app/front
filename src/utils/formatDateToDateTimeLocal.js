import { format } from 'date-fns';

export const formatDateToDateTimeLocal = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), `yyyy-MM-dd'T'HH:mm:ss`);
};
