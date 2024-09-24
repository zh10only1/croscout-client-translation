import { differenceInDays, differenceInMonths, differenceInWeeks } from 'date-fns';
import { DurationTypes } from '@/constant';

// Function to calculate the duration in terms of weeks and days or months and days
export const calculateDuration = (startDate: any, endDate: any, lng: string) => {
    const daysDifference = differenceInDays(endDate, startDate);
    const weeksDifference = differenceInWeeks(endDate, startDate);
    const monthsDifference = differenceInMonths(endDate, startDate);

    let duration = '';

    if (monthsDifference > 0) {
        duration += `${monthsDifference} Month${monthsDifference > 1 ? 's' : ''}`;
        if (daysDifference % 30 > 0) {
            duration += ` ${daysDifference % 30} Day${daysDifference % 30 > 1 ? 's' : ''}`;
        }
    } else if (weeksDifference >= 1) {
        weeksDifference > 1 ? duration += `${weeksDifference} ${DurationTypes["Weeks"][lng]}` : duration += `${weeksDifference} ${DurationTypes["Week"][lng]}`;
        if (daysDifference % 7 > 0) {
            daysDifference % 7 > 1 ? duration += ` ${daysDifference % 7} ${DurationTypes["Days"][lng]}` : duration += ` ${daysDifference % 7} ${DurationTypes["Day"][lng]}`;
        }
    } else {
        daysDifference > 1 ? duration += ` ${daysDifference} ${DurationTypes["Days"][lng]}` : duration += ` ${daysDifference} ${DurationTypes["Day"][lng]}`;
    }

    return duration;
};

// export const calculateDuration = (startDate: any, endDate: any) => {
//     const daysDifference = differenceInDays(endDate, startDate);
//     const weeksDifference = differenceInWeeks(endDate, startDate);
//     const monthsDifference = differenceInMonths(endDate, startDate);

//     let duration = '';

//     if (monthsDifference > 0) {
//         duration += `${monthsDifference}`;
//         if (daysDifference % 30 > 0) {
//             duration += `,${daysDifference % 30}`;
//         }
//     } else if (weeksDifference >= 1) {
//         duration += `${weeksDifference}`;
//         if (daysDifference % 7 > 0) {
//             duration += `,${daysDifference % 7}`;
//         }
//     } else {
//         duration += `0,${daysDifference}`;
//     }

//     return duration;
// };