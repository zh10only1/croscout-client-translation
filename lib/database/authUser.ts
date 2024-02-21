import { getStoredToken } from "@/utils/tokenStorage";

interface RegistrationData {
    name: string;
    email: string;
    password: string;
    taxNumber?: string;
}

interface LoginData {
    email: string;
    password: string;
}

export interface IChangePassword {
    id: string | null;
    updateData: object
    token: string | null
    // token: string; 
}

export interface IUserInfo {
    allData: {
        name: string;
        image: string;
        role: string;
        taxNumber: string;
    };
    token: string | null;
    id: string | undefined;
}


// Registers a new user by sending registration data to the server.
export const registerUser = async ({ data }: { data: RegistrationData }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}


// Logs in a user by sending login data to the server.
export const loginUser = async ({ data }: { data: LoginData }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}


// Logs out the currently authenticated user.
export const logoutUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
    });
    const responseData = await response.json();
    return responseData;
}


// Retrieves user information from the server using the provided token.
export const getUser = async ({ token }: { token: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/current-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    const responseData = await response.json();
    return responseData;
}


// Initiates a forgot password request by sending the user's email to the server.
export const forgotRequest = async ({ email }: { email: string }) => {
    const clientUrl = window.location.origin;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, clientUrl }),
    });
    const responseData = await response.json();
    return responseData;
}


// Resets the user's password using the provided token and new password.
export const resetPassword = async ({ token, newPassword }: { token: string; newPassword?: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
    });
    const responseData = await response.json();
    return responseData;
}


// Changes the password of a user with the given ID using the provided token and update data.
export const changePassword = async (data: IChangePassword) => {
    const update = data.updateData;
    // console.log(data);
    if (!data.token) {
        throw new Error('Token is required for authorization');
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update-password/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token
        },
        body: JSON.stringify({ update }),
    });
    const res = await response.json();
    return res;
}


// Updates user information with the provided data, using the user's ID and token for authorization.
export const updateUserInfo = async (data: IUserInfo) => {
    const update = data.allData;
    if (!data.token) {
        throw new Error('Token is required for authorization');
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token
        },
        body: JSON.stringify({ update }),
    });
    const res = await response.json();
    return res;
}