"use client"

// Importing necessary modules and components
import Loading from "@/components/ui/Loading/Loading";
import { getAllProperty } from "@/lib/database/getProperties";
import { useAuthContext } from "@/providers/AuthProvider";
import { getStoredToken } from "@/utils/tokenStorage";
import { useEffect, useState } from "react";
import PropertiesCard from "./PropertiesCard";

const MyProperties = () => {
    // Retrieving token from local storage
    const token = getStoredToken();

    // State variables for properties and loading status
    const [myProperties, setMyProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // State variable to track property deletion
    const [isDelete, setDelete] = useState(false);

    // Fetching user information using context
    const { user } = useAuthContext();

    useEffect(() => {
        // Variable to track component mount status
        let isMounted = true;

        const fetchMyProperties = async () => {
            // Checking if token exists and component is mounted
            if (token && isMounted) {
                // Fetching properties
                const result = await getAllProperty('/');

                // Setting properties and updating loading status
                setMyProperties(result);
                setLoading(false);
            } else {
                // If no token, setting properties as empty and updating loading status
                setMyProperties([]);
                setLoading(false);
            }
        };
        // Calling fetch function
        fetchMyProperties();

        // Cleanup function to update mount status
        return () => {
            isMounted = false;
        };
    }, [token, user, isDelete]);

    // Rendering loading component if loading is true
    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen">
            <div className="text-white-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:grid-cols-4 gap-11">
                {
                    // Mapping through properties and rendering PropertiesCard component
                    myProperties?.length > 0 && (
                        myProperties.map((property, id) => <PropertiesCard key={id} property={property}
                            setDelete={setDelete}
                        ></PropertiesCard>)
                    )
                }
            </div>
            {
                // Rendering empty state message if no properties exist
                myProperties?.length < 1 && <div className="empty-state"><h1>Property list is empty.</h1></div>
            }
        </div>
    );
};

export default MyProperties;
