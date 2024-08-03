"use client"
import Loading from "@/components/ui/Loading/Loading";
import { getUsersByRole } from "@/lib/database/getUsers";
import { useAuthContext } from "@/providers/AuthProvider";
import { getStoredToken } from "@/utils/tokenStorage";
import { useEffect, useState } from "react";
import AllUsersTable from "../../components/AllUsersTable/AllUsersTable";
import { useTranslation } from "@/app/i18n/client";

type User = {
    name: string
    role: string
    email: string
};

const AllAgentsPage = ({ params: { lng } }: { params: { lng: string } }) => {
    const { t } = useTranslation(lng, "agents");
    // State to hold the list of users
    const [users, setUsers] = useState([]);

    // State to track whether the data is loading
    const [isLoading, setIsLoading] = useState(true);

    // Get the current authenticated user from the AuthProvider context
    const { user } = useAuthContext();

    // Effect hook to fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Retrieve the stored token for authorization
                const token = getStoredToken();
                setIsLoading(true);

                // Check if the token exists
                if (!token) {
                    throw new Error('Token is required for authorization');
                }
                // Fetch users by role using the token
                const data = await getUsersByRole({ role: "agent", token });

                // Update the users state with the fetched data
                setUsers(data.users);
                setIsLoading(false);
            } catch (error) {

                //! Log any errors that occur during fetching
                console.error('Error occurred while fetching users:', error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // If data is still loading, render a loading indicator
    if (isLoading) {
        return <Loading />
    }

    // If there are no users, render a message indicating that
    if (users.length <= 0) {
        return <div className="text-center mt-20 text-white min-h-screen"><h1 className="lg:text-4xl text-2xl text-center">{t("NO_AGENT_YET")}</h1></div>
    }


    return (
        <div className="bg-primary-50 px-3 py-3">
            <h4 className='text-xl mb-3 text-white-50'>{t("ALL_AGENTS")}</h4>
            <AllUsersTable lng={lng} data={users} tableFor="agent" setUsers={setUsers}></AllUsersTable>
        </div>
    );
};

export default AllAgentsPage;
