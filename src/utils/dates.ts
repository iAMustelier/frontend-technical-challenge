import { DateTime } from 'luxon';

export const formatDateTime = (dateTime: DateTime, format = 'L/dd/yyyy, HH:mm:ss a') => {
    return dateTime.toFormat(format);
};
