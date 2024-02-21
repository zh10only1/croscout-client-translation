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