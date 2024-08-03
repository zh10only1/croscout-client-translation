"use client"
// Importing necessary modules and components
import Loading from '@/components/ui/Loading/Loading';
import { getUsersByRole } from '@/lib/database/getUsers';
import React, { useEffect, useState } from 'react';
import AllUsersTable from '../../components/AllUsersTable/AllUsersTable';
import { getStoredToken } from '@/utils/tokenStorage';
import { useTranslation } from '@/app/i18n/client';

// Type definition for user object
type User = {
    email: string;
    name: string;
    password: string;
    image: string;
    role: string;
    favoriteList?: string[];
    __v: number;
    _id: string;
    taxNumber: string;
    createdAt: string;
};

const Page = ({ params: { lng } }: { params: { lng: string } }) => {
    const { t } = useTranslation(lng, 'users');
    // State variables for users and loading status
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Function to fetch users
        const fetchUsers = async () => {
            try {
                // Setting loading status to true
                setIsLoading(true);

                // Retrieving token from local storage
                const token = getStoredToken();

                // If token is not available, throw an error
                if (!token) {
                    throw new Error('Token is required for authorization');
                }
                // Fetching users by role
                const data = await getUsersByRole({ role: "user", token });

                // Setting users and updating loading status
                setUsers(data.users);
                setIsLoading(false);
            } catch (error) {

                //! Handling error if fetching users fails
                console.error('Error occurred while fetching users:', error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Rendering loading component if data is still loading
    if (isLoading) {
        return <Loading />;
    }

    // Rendering message if no users exist
    if (users?.length <= 0) {
        return <div className="text-center mt-20 text-white min-h-screen"><h1 className="lg:text-4xl text-2xl text-center"> {t("NO_USERS_REGISTERED")} </h1></div>;
    }

    // Rendering user table
    return (
        <div className='bg-primary-50 px-3 py-3'>
            <h4 className='text-xl mb-3 text-white-50'>{t("ALL_USERS")}</h4>
            <AllUsersTable lng={lng} data={users} tableFor="user" setUsers={setUsers} />
        </div>
    );
};

export default Page;
