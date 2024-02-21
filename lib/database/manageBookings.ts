import { getStoredToken } from "@/utils/tokenStorage";

interface IManageBookingStatus {
    id: string;
    action: string;
}

export const manageBookingStatus = async (data: IManageBookingStatus) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for manage booking status');
    const action = data.action
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ action }),
    });
    const res = await response.json();
    return res;
}