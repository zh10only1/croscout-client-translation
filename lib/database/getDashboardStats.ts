import { getStoredToken } from "@/utils/tokenStorage";

export const getDashboardStats = async (id: string) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get Dashboard Stats');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/stats/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const stats = await response.json();
    return stats;
}