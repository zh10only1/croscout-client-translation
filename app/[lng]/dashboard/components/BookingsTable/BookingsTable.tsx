"use client"
// Importing necessary modules from various packages and files
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { getBookingsById } from '@/lib/database/getUserBooking';
import { useAuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { manageBookingStatus } from '@/lib/database/manageBookings';

// Defining interfaces for better type checking and documentation
interface Booking {
    _id: string;
    id: number;
    price: string;
    guest: {
        name: string
    },
    total: number;
    status: string;
    method: string;
    startDate: string;
    endDate: string;
    updatedAt: string;
    property: string
}

interface IAllBookingsTable {
    data: Booking[];
    tableFor: string;
    setBookings: any
}

//* Functional component for rendering a bookings table
const BookingsTable: React.FC<IAllBookingsTable> = ({ data, tableFor, setBookings }) => {
    console.log(data);

    //* State to manage dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState("");

    //* Function to toggle dropdown visibility
    const toggleDropdown = (id: string) => {
        if (dropdownOpen) {
            return setDropdownOpen("")
        }
        setDropdownOpen(id);
    };

    //* Function to calculate time since a given date
    const timeSinceWithoutAbout = (dateString: any) => {
        const date = new Date(dateString);
        const distance = formatDistanceToNow(date, { addSuffix: true });
        return distance.replace(/^about /, '');
    };

    //* Fetching user information using context
    const { user } = useAuthContext();
    const userId = (user?._id);

    //? Function to handle status change of a booking
    const handleStatusChanged = (value: string, id: any) => {
        //* Handling different actions based on status change
        if (value === "cancel") {
            // Confirmation dialog for cancel action
            Swal.fire({
                title: "Are you sure?",
                text: "This booking will be removed from everywhere!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                background: "#182237",
                color: "#F9ECE4",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "Close",
                confirmButtonText: "Yes, cancel it!"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    //* Managing booking status in the database
                    const dbResponse = await manageBookingStatus({ id, action: value })
                    if (dbResponse.success) {

                        //* If success, update bookings data and close dialog
                        toast.success(dbResponse.message);
                        const bookingsData = await getBookingsById(userId);
                        setBookings(bookingsData.bookings);
                        Swal.close();
                    }
                    else {
                        toast.error(dbResponse.error, { duration: 5000 })
                        console.log(dbResponse.error);
                    }
                }
                //* Resetting dropdown value
                const optionSelect = document.getElementById(id) as HTMLInputElement
                if (optionSelect) {
                    optionSelect.value = "pending";
                }
            });
        }

        if (value === "confirm") {

            // Confirmation dialog for confirm action
            Swal.fire({
                title: "Are you sure?",
                text: "This booking status will be changed to confirmed!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                background: "#182237",
                color: "#F9ECE4",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "Close",
                confirmButtonText: "Yes, confirm it!"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    //* Managing booking status in the database
                    const dbResponse = await manageBookingStatus({ id, action: value })
                    if (dbResponse.success) {

                        //* If success, update bookings data and close dialog
                        toast.success(dbResponse.message, { duration: 5000 });
                        const bookingsData = await getBookingsById(userId);
                        setBookings(bookingsData.bookings);
                        Swal.close();
                    }
                    else {
                        console.log(dbResponse.error);
                        const optionSelect = document.getElementById(id) as HTMLInputElement
                        if (optionSelect) {
                            optionSelect.value = "pending";
                        }
                        toast.error(dbResponse.error, { duration: 5000 });
                    }
                }
                else {
                    // Resetting dropdown value
                    const optionSelect = document.getElementById(id) as HTMLInputElement
                    if (optionSelect) {
                        optionSelect.value = "pending";
                    }
                }
            });
        }
    }

    //? Rendering bookings table
    return (
        <div className=''>
            <div className="relative min-h-screen overflow-x-auto rounded-lg ">
                <table className="w-full text-left p-4 rtl:text-right rounded-t-xl text-secondary-50 text-sm lg:text-base whitespace-nowrap">
                    <thead className="my-3 bg-[#2E374A] p-5 whitespace-nowrap">
                        <tr>
                            <th className="p-5 font-semibold">
                                #
                            </th>
                            <th className="p-5 font-semibold">
                                Name
                            </th>
                            <th className="p-5 font-semibold">
                                Status
                            </th>
                            <th className="p-5 font-semibold ">
                                Last Booking
                            </th>
                            <th className="p-5 font-semibold">
                                Check in - Check out
                            </th>
                            <th className="p-5 font-semibold">
                                Total Price
                            </th>
                            <th className="p-5 font-semibold">

                            </th>
                        </tr>
                    </thead>
                    <tbody className='relative whitespace-nowrap'>
                        {
                            //* Mapping through bookings data and rendering rows
                            data?.slice()?.reverse().map((booking, indx) => (
                                <tr key={indx} className="hover:bg-[#2E374A] hover:rounded-lg bg-primary-50 my-3 p-2 cursor-pointer">
                                    <td className="px-6 py-4 m-5 font-medium">
                                        {indx + 1}
                                    </td>
                                    <td className="px-6 py-4 m-5 font-medium">
                                        <div className='flex'>
                                            <div className='flex items-center'>
                                                <p className='font-semibold'>{booking.guest?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {
                                        //* Rendering status based on user role
                                        user?.role === "admin" ?
                                            <td>
                                                <button className='sm:text-left cursor-auto text-right md:text-sm text-xs'>
                                                    <span
                                                        className={`${booking.status === 'pending' ? "bg-orange-400" : 'bg-[#afcfee83]'} text-white-50 p-2 rounded-md`}>
                                                        {booking.status}
                                                    </span>
                                                </button>
                                            </td>
                                            :
                                            <td className="px-6 py-4 m-5">
                                                {
                                                    booking.status === "confirmed" ?
                                                        <button className='sm:text-left cursor-auto text-right md:text-sm text-xs'>
                                                            <span
                                                                className="bg-[#afcfee83] text-white-50 p-2 rounded-md">
                                                                Confirmed
                                                            </span>
                                                        </button>
                                                        :
                                                        //* Dropdown for pending status with cancel/confirm options
                                                        <select
                                                            defaultValue="pending"
                                                            onChange={(e) => { handleStatusChanged(e.target.value, booking._id) }}
                                                            className='sm:text-left text-right md:text-sm text-xs w-32 bg-primary-50 text-white outline-none p-2 rounded-md'
                                                            name="status"
                                                            id={`${booking?._id}`}>
                                                            <option value="pending" disabled>Pending</option>
                                                            <option value="cancel">Cancel</option>
                                                            {
                                                                user?.role === "agent" &&
                                                                <option value="confirm">Confirm</option>
                                                            }
                                                        </select>
                                                }
                                            </td>
                                    }
                                    <td className="px-6 py-4 m-5">
                                        <p className=''>{timeSinceWithoutAbout(booking?.updatedAt)}</p>
                                    </td>
                                    <td className="px-6 py-4 m-5">
                                        <div className='flex justify-between items-center'>
                                            <p className='flex justify-between'>
                                                {format(new Date(booking.startDate), "MMM dd, yyyy")} <span className='px-2 inline-block'>-</span>
                                                {format(new Date(booking.endDate), "MMM dd, yyyy")}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 m-5">
                                        <p className='text-left left-3'>€ {booking.price}</p>
                                    </td>
                                    <td className="px-6 py-4 m-5">
                                        <div className={`flex flex-col bottom-0 right-3 gap-2 font-semibol`}>
                                            {
                                                //* Rendering different links based on user role
                                                user?.role === "user" ?
                                                    <>
                                                        <Link href={`/dashboard/user/booking-details/${booking?._id}`}>
                                                            <button className='bg-primary-50 hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md text-xs'>
                                                                Booking Details
                                                            </button>
                                                        </Link>
                                                        <Link href={`/dashboard/user/payment-details/${booking._id}`}>
                                                            <button className='bg-primary-50 text-xs hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md'>Payment Details</button>
                                                        </Link>
                                                        <Link href={`/dashboard/user/feadback/${booking?._id}?property_id=${booking?.property}`}>
                                                            <button className='bg-primary-50 text-xs hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md'>Feadback</button>
                                                        </Link>
                                                    </>
                                                    :
                                                    user?.role === "agent" ?
                                                        <>
                                                            <Link href={`/dashboard/agent/booking-details/${booking?._id}`}>
                                                                <button className='bg-primary-50 hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md text-xs'>
                                                                    Booking Details
                                                                </button>
                                                            </Link>
                                                            <Link href={`/dashboard/agent/payment/${booking._id}`}>
                                                                <button className='bg-primary-50 text-xs hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md'>Payment Details</button>
                                                            </Link>
                                                        </>
                                                        :
                                                        <Link href={`/dashboard/admin/booking-details/${booking?._id}`}>
                                                            <button className='bg-primary-50 hover:border-white duration-200 w-full border-accent border text-white-50 px-2 py-1 rounded-md text-xs'>
                                                                Booking Details
                                                            </button>
                                                        </Link>

                                            }

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default BookingsTable;
