import { getStoredToken } from "@/utils/tokenStorage";

export const getBookingDetails = async (id: string) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get booking details');
    const response = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const result = (await response).json();
    return result
}