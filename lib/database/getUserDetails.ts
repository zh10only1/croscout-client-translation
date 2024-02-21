import { getStoredToken } from "@/utils/tokenStorage";

export const getUserDetailsById = async (id: any) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get user details by id');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/by-userid/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const result = await response.json();
    return result;
}