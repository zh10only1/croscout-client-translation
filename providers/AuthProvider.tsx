"use client"
import Loading from "@/components/ui/Loading/Loading";
import { getUser } from "@/lib/database/authUser";
import { setCookie } from "@/utils/authCookie";
import { getStoredToken } from "@/utils/tokenStorage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


// Define the User interface
export interface User {
    email: string;
    name: string;
    password: string;
    image: string;
    role: string;
    favoriteList?: string[];
    __v: number;
    _id: string;
    createdAt: string;
    telephoneOrPhone: string;
    street: string;
    houseOrBuildingNum: string;
    postcode: string;
    city: string;
    state: string;
    taxNumber: string;
    isCompletedProfile: boolean;
    isEmailVerified: boolean;
}



// Interface of Auth Context Props
interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isUpdateProfile: boolean;
    setIsUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>;
    userRefetch: () => Promise<void>;
}

// Created Context
export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // State for user
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);

    // console.log(user);
    // if(user){
    //     console.log('found');
    // }
    // else{
    //     console.log('not found');
    // }

    // Fetches user data on component mount, sets user state

    const userRefetch = async () => {
        const token = getStoredToken();
        if (token) {
            const newUser = await getUser({ token });
            return setUser(newUser)
        }
    }
    const token = getStoredToken();
    useEffect(() => {
        if (!token) {
            return;
        }
        let isMounted = true;
        const fetchUser = async () => {
            setLoading(true);
            if (token && isMounted) {
                const { user } = await getUser({ token });
                setUser(user);
                setCookie("authToken", token.split(" ")[1], 24)
                setLoading(false);
            }
            else {
                setUser(null)
                setLoading(false);
            }
        };
        fetchUser();
        return () => {
            isMounted = false;
        };
    }, [token, isUpdateProfile]);

    if (loading) {
        return <Loading />
    }

    // Context Values
    const contextValue: AuthContextProps = {
        user,
        setUser,
        loading,
        setLoading,
        isUpdateProfile,
        setIsUpdateProfile,
        userRefetch
    };



    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuthContext };