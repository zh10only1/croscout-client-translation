"use client"
import ImageCarousel from '@/components/Home/Property/ImageCarousel';
import { useRouter } from 'next/navigation';
import styles from "./properties.module.css"
import { Property } from '@/constant';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '@/components/ui/Loading/Loading';
import { getStoredToken } from '@/utils/tokenStorage';


const PropertiesCard = ({ property, setDelete }: Property & any) => {
    const {
        _id,
        pricePerNight,
        location,
        state,
        propertyType,
        propertyImages,
    } = property;

    const router = useRouter();

    const handleDelete = async () => {
        try {
            //* Display a confirmation dialog using SweetAlert
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

                //* If the user confirms the deletion
                if (result.isConfirmed) {
                    const token = getStoredToken();
                    if (!token) throw new Error('Token is required for get Favorites');

                    //* Send a DELETE request to the server to delete the property
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': token
                        }
                    });

                    //* If the request is successful
                    if (response.ok) {

                        //* Display a success message
                        toast.success('Property deleted successfully');

                        //* Reload properties by toggling the isDelete state variable
                        setDelete((prev: boolean) => !prev);

                        //* Optionally, you might want to close the modal here
                        Swal.close();
                    } else {

                        //! Display an error message if the request fails
                        toast.error('Failed to delete property');
                    }
                }
            });
        } catch (error) {

            //! Handle any errors that occur during the deletion process
            console.error('Error deleting property:', error);
            toast.error('An error occurred while deleting the property');
        }
    };


    return (
        <div
            className={'cursor-pointer relative border border-accent p-[5px] bg-secondary rounded-[8px] text-white '}
        >
            <div className="h-[15rem] w-full relative rounded-t-[4px] overflow-hidden">
                <ImageCarousel propertyId={_id} propertyImages={propertyImages} />
            </div>
            <div
                className="p-2 "
            >
                <div
                    className={"mt-5"}>

                    {/*//? Location and State */}
                    <h1 className="text-xl font-bold">
                        {`${location.substring(0, 10)}, ${state.substring(0, 13)}`}
                    </h1>


                    {/*//? Property Type */}
                    <p className="mt-[10px]">{propertyType}</p>


                    {/*//? Price and Ratings */}
                    <div className="flex justify-between mt-[10px]">

                        {/*//? Price */}
                        <div className="text-accent font-semibold">€ {pricePerNight} night</div>
                    </div>
                    <div className={`flex gap-3 mt-4 ${styles.propertiesButton}`}>
                        <button onClick={() => router.push(`/dashboard/agent/edit-properties/${_id}`)} className='hover:bg-green-500  border border-green-500'>Edit</button>
                        <button onClick={handleDelete} className='hover:bg-[#d33] border border-red-500'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesCard;