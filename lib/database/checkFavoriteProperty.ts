import { getStoredToken } from "@/utils/tokenStorage";

// Checks if a property is marked as a favorite for the specified user.
export const checkFavoriteProperty = async ({ userId, propertyId }: any) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for check favourite property');
    const response = await fetch(`http://localhost:5000/api/favorites/${userId}/check-favorite?property_id=${propertyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const result = await response.json();

    return result;
}