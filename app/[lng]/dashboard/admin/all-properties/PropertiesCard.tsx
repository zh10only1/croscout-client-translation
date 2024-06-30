"use client"
// Importing necessary modules and components
import ImageCarousel from '@/components/Home/Property/ImageCarousel';
import { useRouter } from 'next/navigation';
import styles from "./properties.module.css";
import { Property } from '@/constant';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '@/components/ui/Loading/Loading';
import { getStoredToken } from '@/utils/tokenStorage';

// Functional component for rendering a property card
const PropertiesCard = ({ property, setDelete }: Property & any) => {

    // Destructuring property object
    const {
        _id,
        pricePerNight,
        location,
        state,
        propertyType,
        propertyImages,
    } = property;

    // Initializing router
    const router = useRouter();

    // Function to handle property deletion
    const handleDelete = async () => {
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
                if (result.isConfirmed) {
                    // Sending DELETE request to server
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': token
                        }
                    });

                    if (response.ok) {
                        // If deletion is successful, show success message, update state, and close modal
                        toast.success('Property deleted successfully');
                        <Loading />
                        setDelete(true);
                        Swal.close();
                    } else {
                        // If deletion fails, show error message
                        toast.error('Failed to delete property');
                    }
                }
            });
        } catch (error) {
            //! Handling error if deletion fails
            console.error('Error deleting property:', error);
            toast.error('An error occurred while deleting the property');
        }
    };

    // Rendering property card
    return (
        <div className={'cursor-pointer relative border border-accent p-[5px] bg-secondary rounded-[8px] text-white'}>
            <div className="h-[15rem] w-full relative rounded-t-[4px] overflow-hidden">
                {/* Rendering image carousel */}
                <ImageCarousel propertyId={_id} propertyImages={propertyImages} />
            </div>
            <div className="p-2">
                <div className="mt-5">
                    {/* Location and State */}
                    <h1 className="text-xl font-bold">
                        {`${location.substring(0, 10)}, ${state.substring(0, 13)}`}
                    </h1>

                    {/* Property Type */}
                    <p className="mt-[10px]">{propertyType}</p>

                    {/* Price and Ratings */}
                    <div className="flex justify-between mt-[10px]">
                        {/* Price */}
                        <div className="text-accent font-semibold">€{pricePerNight} night</div>
                    </div>

                    <div className={`flex gap-3 mt-4 ${styles.propertiesButton}`}>

                        {/*//? Buttons for editing and deleting property */}
                        <button onClick={() => router.push(`/dashboard/admin/edit-properties/${_id}`)} className='hover:bg-green-500  border border-green-500'>Edit</button>
                        <button onClick={handleDelete} className='hover:bg-[#d33] border border-red-500'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesCard;
