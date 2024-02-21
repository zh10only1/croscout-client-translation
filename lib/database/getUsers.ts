import { getStoredToken } from "@/utils/tokenStorage";

export const getAllUsers = async () => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get Favorites');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/all-users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const jsonResponse = await response.json();
    const users = jsonResponse;
    return users;
};


export const getUsersByRole = async ({ role, token }: { role: string, token: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/users/by-role?role=${role}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const jsonResponse = await response.json();
    const users = jsonResponse;
    return users;
};

