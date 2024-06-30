"use client"
import { useAuthContext } from '@/providers/AuthProvider';
import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '@/components/ui/Loading/Loading';
import { getStoredToken } from '@/utils/tokenStorage';
import { getUsersByRole } from '@/lib/database/getUsers';
import Link from 'next/link';

//? Define the User interface with properties for user details
interface User {
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
}

//? Define the props for the AllUsersTable component
interface AllUsersTableProps {
    data: User[];
    tableFor: string;
    setUsers?: any;
}



const AllUsersTable: React.FC<AllUsersTableProps> = ({ data, tableFor, setUsers }) => {
    // Get the current authenticated user from the AuthProvider context
    const { user } = useAuthContext();


    const handleDelete = async (userId: string) => {
        try {

            const token = getStoredToken();
            if (!token) throw new Error('Token is required for get Favorites');
            // Confirmation dialog for deletion
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                background: "#182237",
                color: "#F9ECE4",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result?.isConfirmed) {
                    // Sending DELETE request to server
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    if (response.ok) {
                        // If deletion is successful, show success message, update state, and close modal
                        toast.success('User deleted successfully');
                        // <Loading />
                        // setDelete(true);
                        // Fetching users by role
                        if (tableFor === "agent") {
                            const data = await getUsersByRole({ role: "agent", token });
                            setUsers(data.users);
                        }
                        else if (tableFor === "user") {
                            const data = await getUsersByRole({ role: "user", token });

                            setUsers(data.users);
                        }
                        
                        Swal.close();
                    } else {
                        // If deletion fails, show error message
                        toast.error('Failed to delete user');
                    }
                }
            });
        } catch (error) {
            //! Handling error if deletion fails
            console.error('Error deleting user:', error);
            toast.error('An error occurred while deleting the user');
        }
    };

    // Get the router object for navigation
    const router = useRouter();

    // Render the table with user data
    return (
        <div className=''>
            <div className="relative overflow-x-auto rounded-lg ">
                <table className="w-full text-left p-4 rtl:text-right rounded-t-xl text-secondary-50 whitespace-nowrap">

                    {/*//?==========Table head Start================*/}
                    <thead className="my-3 bg-[#2E374A] p-5 ">
                        <tr>
                            <th className="lg:p-5 p-3 font-semibold">
                                #
                            </th>
                            <th className="lg:p-5 p-3 font-semibold">
                                Name
                            </th>
                            <th className="lg:p-5 p-3 font-semibold">
                                Email
                            </th>
                            {
                                tableFor === "agent" &&
                                <>
                                    <th className="lg:p-5 p-3 font-semibold">
                                        Tax ID
                                    </th>

                                </>
                            }
                            <th className="lg:p-5 p-3 font-semibold">
                                User ID
                            </th>
                            <th className="lg:p-5 p-3 font-semibold">
                                Joined At
                            </th>
                            <th className="lg:p-5 p-3 font-semibold text-center">
                                Details
                            </th>
                            <th className="lg:p-5 p-3 font-semibold text-center">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    {/*//?==========Table head End================*/}

                    {/*//?==========Table Body Start================*/}
                    <tbody className=' overflow-hidden'>
                        {
                            //  Map over the user data to create table rows
                            data?.map((user, indx) => <tr key={indx} className="hover:bg-[#2E374A] hover:rounded-lg bg-primary-50 my-3 p-2">
                                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5 font-medium">
                                    {indx + 1}
                                </td>
                                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                                    {user?.name}
                                </td>
                                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5 font-medium">
                                    {user?.email}
                                </td>
                                {/* Conditionally render the Tax ID cell if the table is for agents */}
                                {
                                    tableFor === "agent" &&

                                    <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                                        {user?.taxNumber}
                                    </td>
                                }
                                <td className="lg:px-6 px-4 text-sm lg:text-base py-4">
                                    {user?._id}
                                </td>
                                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                                    {format(new Date(user?.createdAt), "MMM dd, yyyy")}
                                </td>

                                <td className="lg:px-6 px-4 text-xs lg:text-sm py-4 m-5 text-center">
                                    <Link href={`/dashboard/admin/user-details/${user?._id}`}>
                                        <button className='px-4 py-1 rounded-md border text-white-50 hover:border-white duration-150 border-green-400'>{user.role === 'agent' ? 'Agent' : 'User'} Details</button>
                                    </Link>
                                </td>
                                <td className="lg:px-6 px-4 text-xs lg:text-sm py-4 m-5 text-center">
                                    <button onClick={() => handleDelete(user?._id)} className='px-4 py-1 rounded-md border hover:bg-red-500
                                    duration-150 text-white border-red-400'> Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                    {/*//?==========Table body end================*/}
                </table>
            </div>
        </div>
    );
};

export default AllUsersTable;
