import { getStoredToken } from "@/utils/tokenStorage";

export const sendVerificationEmail = async () => {
    const token = getStoredToken();
    if (!token) throw new Error('Token is required for send verification email');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email-verification/send-verification-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const responseData = await response.json();
    return responseData;
}

export const verifyEmail = async ({token}: {token: string}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email-verification/verify-email?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}