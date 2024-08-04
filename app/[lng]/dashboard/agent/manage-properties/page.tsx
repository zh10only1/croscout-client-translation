"use client";

import Loading from "@/components/ui/Loading/Loading";
import { getPropertiesByUser } from "@/lib/database/getProperties";
import { useAuthContext } from "@/providers/AuthProvider";
import { getStoredToken } from "@/utils/tokenStorage";
import { useEffect, useState } from "react";
import PropertiesCard from "./PropertiesCard";
import { translateProperties } from "@/lib/database/getProperties";
import { useTranslation } from "@/app/i18n/client";

//? Define MyProperties functional component
const MyProperties = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = useTranslation(lng, "properties");
  //* Get token from local storage
  const token = getStoredToken();

  //* State variables initialization
  const [myProperties, setMyProperties] = useState([]);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [isDelete, setDelete] = useState(false);

  //* Fetch user properties when component mounts or isDelete state changes
  useEffect(() => {
    let isMounted = true;
    const fetchMyProperties = async () => {
      if (token && isMounted) {
        const result = await getPropertiesByUser({ token, email: user?.email });
        const translationResponse = await translateProperties(
          result.properties,
          lng,
          false
        );
        if (translationResponse.success) {
          result.properties = translationResponse.translatedProperties;
        }
        setMyProperties(result.properties);
        setLoading(false);
      } else {
        setMyProperties([]);
        setLoading(false);
      }
    };
    fetchMyProperties();
    return () => {
      isMounted = false;
    };
  }, [token, user, isDelete]);

  //* Render Loading component if data is still loading
  if (loading) {
    return <Loading />;
  }

  //* Render property cards if there are properties, otherwise render a message
  return (
    <div className="min-h-screen">
      <div className="text-white-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:grid-cols-4 gap-11">
        {myProperties?.length > 0 &&
          myProperties.map((property, id) => (
            <PropertiesCard
              lng={lng}
              key={id}
              property={property}
              setDelete={setDelete}
            />
          ))}
      </div>
      {myProperties?.length < 1 && (
        <div className="text-center mt-20 text-white">
          <h1 className="lg:text-4xl text-2xl text-center">
            {t("PROPERTY_LIST_IS_EMPTY")}
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
