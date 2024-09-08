"use client";
import { useAuthContext } from "@/providers/AuthProvider";
import BookingsTable from "../../components/BookingsTable/BookingsTable";
import { useEffect, useState } from "react";
import { getBookingsById } from "@/lib/database/getUserBooking";
import Loading from "@/components/ui/Loading/Loading";
import EmptyPage from "@/components/common/EmptyPage";
import { translateBookings } from "@/lib/database/getBookings";
import { useTranslation } from "@/app/i18n/client";

const page = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = useTranslation(lng, "bookings");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();
  const userId = user?._id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        console.log("User ID is undefined, skipping fetch");
        return;
      }
      try {
        setIsLoading(true);
        const bookingsData = await getBookingsById(userId);
        const translationResponse = await translateBookings(
            bookingsData.bookings,
            lng,
            true
        );
        if (translationResponse.success) {
            bookingsData.bookings = translationResponse.translatedBookings;
        }
        setBookings(bookingsData.bookings);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!bookings || bookings.length === 0) {
    return <EmptyPage>{t("NO_BOOKINGS_FOUND")}</EmptyPage>;
  }

  return (
    <div className="min-h-screen">
      {/* <Bookings /> */}
      <BookingsTable
        lng={lng}
        setBookings={setBookings}
        data={bookings}
        tableFor="user"
      />
    </div>
  );
};

export default page;
