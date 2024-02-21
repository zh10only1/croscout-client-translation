import { getStoredToken } from "@/utils/tokenStorage";

export const getAllTrasaction = async () => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get all transactions');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const result = await response.json();
    return result;
}

export const getTransactionById = async (id: string) => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for get transaction by id');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const result = await response.json();
    return result;
}