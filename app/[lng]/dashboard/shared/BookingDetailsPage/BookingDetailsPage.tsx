"use client"
import { getBookingDetails } from '@/lib/database/getBookingDetails';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { format } from 'date-fns';
import Image from 'next/image';

export interface IPropertyDetailsData {
    property: {
        name: string;
        description: string;
        amenities: string[];
        pricePerNight: number;
        location: string;
        state: string;
        propertyType: string;
        propertyImages: string[];
        owner: string;
        status: string;
        guests: string
    };
    guest: {
        name: string;
    };
    owner: {
        name: string;
    };
    totalGuests: string;
    startDate: string;
    endDate: string;
    status: string;
    price: string;
    // ... other properties if needed
}

export interface IBooking {
    _id: string;
    // ... other fields that belong to a booking
}

const BookingDetailsPage = () => {
    const [bookingDetails, setBookingDetails] = useState<IPropertyDetailsData>();
    console.log(bookingDetails);
    const { id } = useParams();

    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            if (typeof id === 'string') {
                const bookingData = await getBookingDetails(id);
                setBookingDetails(bookingData.booking);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='min-h-screen'>
            {bookingDetails && (
                <div className="flex flex-col gap-4 p-4 lg:p-16 bg-primary-50 text-secondary-50">
                    <div className="flex items-center gap-4 mb-2">
                        <button onClick={() => router.push("/dashboard/user/my-bookings")} className="text-secondary-50 border rounded-md px-2 py-1">
                            <IoArrowBack />
                        </button>
                        <h1 className="font-semibold text-gray-300 text-lg md:text-xl">
                            Reservation details
                            <span className="font-normal text-gray-500 dark:text-gray-400">- Confirmation {bookingDetails?.status}</span>
                        </h1>
                    </div>
                    <div className="rounded-lg border border-gray-600 lg:p-6 bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-2xl font-semibold text-gray-300 whitespace-nowrap leading-none tracking-tight">Reservation details</h3>
                        </div>
                        <div className='lg:p-6 flex md:flex-row flex-col md:gap-6 gap-3'>
                            {bookingDetails?.property?.propertyImages && bookingDetails?.property?.propertyImages?.length > 0 ? (
                                <>
                                    {bookingDetails?.property?.propertyImages.slice(0, 4).map((imgSrc, index) => (
                                        <Image
                                            key={index}
                                            className='rounded-md'
                                            src={imgSrc}
                                            alt={`Property ${index + 1}`}
                                            width={300} // Adjust the width as needed
                                            height={250} // Adjust the height as needed
                                        />
                                    ))}
                                </>
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                        <div className="p-6 grid gap-4 md:grid-cols-3">
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Guest's name</div>
                                <div>{bookingDetails?.guest.name}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Owner Name</div>
                                <div>{bookingDetails?.owner.name}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Confirmation status</div>
                                <div>{bookingDetails?.status}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Check-in</div>
                                <div>{format(new Date(bookingDetails?.startDate), "MMM dd, yyyy")}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Check-out</div>
                                <div>{format(new Date(bookingDetails?.endDate), "MMM dd, yyyy")}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Location</div>
                                <div>{bookingDetails?.property?.location}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Room type</div>
                                <div>{bookingDetails?.property?.propertyType}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Number of guests</div>
                                <div>Guests: {bookingDetails?.totalGuests}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Total price</div>
                                <div>€ {bookingDetails?.price}</div>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-semibold text-gray-300 text-xl">Special requests</div>
                                <div>No smoking room</div>
                            </div>
                        </div>
                        <div className='lg:w-2/3 md:p-6'>
                            <div className="font-semibold text-gray-300 text-xl">Description</div>
                            <p className=' w-full'>{bookingDetails?.property?.description}</p>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default BookingDetailsPage;