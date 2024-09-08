"use client";
import Loading from "@/components/ui/Loading/Loading";
import { getUserDetailsById } from "@/lib/database/getUserDetails";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

// Interface for user details
interface UserDetails {
  name: string;
  email: string;
  telephoneOrPhone: string;
  role: string;
  street: string;
  houseOrBuildingNum: string;
  postcode: string;
  city: string;
  state: string;
}
const page = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { id, lng } = useParams();

  const { t } = useTranslation(`${lng}`, "userDetails");

  // Fetch user details based on ID
  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        setIsLoading(true);
        const userData = await getUserDetailsById(id);
        setUserDetails(userData.user);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading spinner if data is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 text-wrap">
      {/*//* User Details Section */}
      <div className="px-4 md:px-6">
        <div className="space-y-3">
          <div className="space-y-1 text-white-50">
            <h1 className="text-2xl font-bold">{t("USER_DETAILS")}</h1>
          </div>
        </div>
      </div>

      {/*//*========= User Details: User information field start ========= */}
      <div className="px-4 md:px-6 text-secondary-50">
        <div className="rounded-lg border border-gray-600 bg-card text-card-foreground shadow-sm">
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("NAME")}</p>
                <p className="text-sm sm:col-start-2">{userDetails?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("EMAIL")}</p>
                <p className="text-sm sm:col-start-2">{userDetails?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("TELEPHONE")}</p>
                <p className="text-sm sm:col-start-2">
                  {userDetails?.telephoneOrPhone
                    ? userDetails.telephoneOrPhone
                    : t("NOT_UPDATED")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("ROLE")}</p>
                <p className="text-sm sm:col-start-2">
                  {userDetails?.role ? userDetails.role : t("NOT_UPDATED")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*//*========= User Details: User information field End ========= */}

      {/*//*======== Address Details Section start ============*/}
      <div className="px-4 md:px-6">
        <div className="rounded-lg border border-gray-600 bg-card text-card-foreground shadow-sm">
          <div className="p-4 md:px-6 md:pt-6">
            <h3 className="text-2xl font-semibold text-white">
              {t("ADDRESS")}
            </h3>
          </div>
          <div className="p-4 md:p-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("STREET")}</p>
                <p className="text-sm sm:col-start-2 text-secondary-50">
                  {userDetails?.street ? userDetails.street : t("NOT_UPDATED")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("HOUSE")}</p>
                <p className="text-sm sm:col-start-2 text-secondary-50">
                  {userDetails?.houseOrBuildingNum
                    ? userDetails.houseOrBuildingNum
                    : t("NOT_UPDATED")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("POSTCODE")}</p>
                <p className="text-sm sm:col-start-2 text-secondary-50">
                  {userDetails?.postcode
                    ? userDetails.postcode
                    : t("NOT_UPDATED")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("CITY")}</p>
                <p className="text-sm sm:col-start-2 text-secondary-50">
                  {userDetails?.city ? userDetails.city : t("NOT_UPDATED")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white-50">{t("STATE")}</p>
                <p className="text-sm text-secondary-50">
                  {userDetails?.state ? userDetails.state : t("NOT_UPDATED")}
                </p>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
