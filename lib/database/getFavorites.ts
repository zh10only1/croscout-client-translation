import { getStoredToken } from "@/utils/tokenStorage";

export const getFavorites = async (userId: any) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get Favorites');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const result = await response.json();

    return result;
}