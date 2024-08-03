"use client";
import { useAuthContext } from "@/providers/AuthProvider";
import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "@/components/ui/Loading/Loading";
import { getStoredToken } from "@/utils/tokenStorage";
import { getUsersByRole } from "@/lib/database/getUsers";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

// Define the User interface with properties for user details
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

// Define the props for the AllUsersTable component
interface AllUsersTableProps {
  data: User[];
  tableFor: string;
  setUsers?: any;
  lng: string;
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({
  lng,
  data,
  tableFor,
  setUsers,
}) => {
  // Get the current authenticated user from the AuthProvider context
  const { user } = useAuthContext();
  const { t } = useTranslation(lng, "users");

  const handleDelete = async (userId: string) => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error("Token is required for get Favorites");
      // Confirmation dialog for deletion
      Swal.fire({
        title: t("ARE_YOU_SURE"),
        text: t("YOU_WONT_BE_ABLE_TO_REVERT_THIS"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        background: "#182237",
        color: "#F9ECE4",
        cancelButtonColor: "#3085d6",
        confirmButtonText: t("YES_DELETE_IT"),
      }).then(async (result) => {
        if (result?.isConfirmed) {
          // Sending DELETE request to server
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (response.ok) {
            // If deletion is successful, show success message, update state, and close modal
            toast.success(t("USER_DELETED_SUCCESSFULLY"));
            // Fetching users by role
            if (tableFor === "agent") {
              const data = await getUsersByRole({ role: "agent", token });
              setUsers(data.users);
            } else if (tableFor === "user") {
              const data = await getUsersByRole({ role: "user", token });
              setUsers(data.users);
            }
            Swal.close();
          } else {
            // If deletion fails, show error message
            toast.error(t("FAILED_TO_DELETE_USER"));
          }
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(t("ERROR_OCCURED_WHILE_DELETING_USER"));
    }
  };

  // Get the router object for navigation
  const router = useRouter();

  // Render the table with user data
  return (
    <div className="">
      <div className="relative overflow-x-auto rounded-lg ">
        <table className="w-full text-left p-4 rtl:text-right rounded-t-xl text-secondary-50 whitespace-nowrap">
          {/* Table head */}
          <thead className="my-3 bg-[#2E374A] p-5 ">
            <tr>
              <th className="lg:p-5 p-3 font-semibold">{t("NUMBER")}</th>
              <th className="lg:p-5 p-3 font-semibold">{t("NAME")}</th>
              <th className="lg:p-5 p-3 font-semibold">{t("EMAIL")}</th>
              {tableFor === "agent" && (
                <th className="lg:p-5 p-3 font-semibold">{t("TAX_ID")}</th>
              )}
              <th className="lg:p-5 p-3 font-semibold">{t("USER_ID")}</th>
              <th className="lg:p-5 p-3 font-semibold">{t("JOINED_AT")}</th>
              <th className="lg:p-5 p-3 font-semibold text-center">
                {t("DETAILS")}
              </th>
              <th className="lg:p-5 p-3 font-semibold text-center">
                {t("ACTIONS")}
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="overflow-hidden">
            {data?.map((user, indx) => (
              <tr
                key={indx}
                className="hover:bg-[#2E374A] hover:rounded-lg bg-primary-50 my-3 p-2"
              >
                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5 font-medium">
                  {indx + 1}
                </td>
                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                  {user?.name}
                </td>
                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5 font-medium">
                  {user?.email}
                </td>
                {tableFor === "agent" && (
                  <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                    {user?.taxNumber}
                  </td>
                )}
                <td className="lg:px-6 px-4 text-sm lg:text-base py-4">
                  {user?._id}
                </td>
                <td className="lg:px-6 px-4 text-sm lg:text-base py-4 m-5">
                  {format(new Date(user?.createdAt), "MMM dd, yyyy")}
                </td>
                <td className="lg:px-6 px-4 text-xs lg:text-sm py-4 m-5 text-center">
                  <Link href={`/dashboard/admin/user-details/${user?._id}`}>
                    <button className="px-4 py-1 rounded-md border text-white-50 hover:border-white duration-150 border-green-400">
                      {user.role === "agent"
                        ? t("AGENT_DETAILS")
                        : t("USER_DETAILS")}
                    </button>
                  </Link>
                </td>
                <td className="lg:px-6 px-4 text-xs lg:text-sm py-4 m-5 text-center">
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="px-4 py-1 rounded-md border hover:bg-red-500
                                    duration-150 text-white border-red-400"
                  >
                    {t("DELETE")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersTable;
