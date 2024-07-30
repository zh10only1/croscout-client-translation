import { getStoredToken } from "@/utils/tokenStorage";

export const getAllBookings = async () => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get all bookings');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token

        },
    });
    const { bookings } = await response.json();
    return bookings;
}

export const translateBookings = async (bookings: any[], lng: string, statusOnly: boolean = false) => {
    console.log(bookings);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/translateBookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookings, lng, statusOnly }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}