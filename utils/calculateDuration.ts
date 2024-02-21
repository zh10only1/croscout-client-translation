import { differenceInDays, differenceInMonths, differenceInWeeks } from 'date-fns';

// Function to calculate the duration in terms of weeks and days or months and days
export const calculateDuration = (startDate: any, endDate: any) => {
    const daysDifference = differenceInDays(endDate, startDate);
    const weeksDifference = differenceInWeeks(endDate, startDate);
    const monthsDifference = differenceInMonths(endDate, startDate);

    let duration = '';

    if (monthsDifference > 0) {
        duration += `${monthsDifference} month${monthsDifference > 1 ? 's' : ''}`;
        if (daysDifference % 30 > 0) {
            duration += ` ${daysDifference % 30} day${daysDifference % 30 > 1 ? 's' : ''}`;
        }
    } else if (weeksDifference >= 1) {
        duration += `${weeksDifference} week${weeksDifference > 1 ? 's' : ''}`;
        if (daysDifference % 7 > 0) {
            duration += ` ${daysDifference % 7} day${daysDifference % 7 > 1 ? 's' : ''}`;
        }
    } else {
        duration += `${daysDifference} day${daysDifference > 1 ? 's' : ''}`;
    }

    return duration;
};