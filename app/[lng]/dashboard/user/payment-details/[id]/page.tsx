"use client";
import Loading from "@/components/ui/Loading/Loading";
import { getPaymentDetailsById } from "@/lib/database/getPaymentDetails";
import { getStoredToken } from "@/utils/tokenStorage";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { RiMessage2Fill } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";

export interface IPaymentData {
  agentPaypalEmail: string;
  paymentInstruction: string;
  userTransactionId: string;
  property?: {
    name: string; // Assuming 'name' is a string, adjust the type as needed
  };
}

type Inputs = {
  userTransactionId: number;
};

const page = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = useTranslation(lng, "userPaymentDetails");
  const [paymentDetails, setPaymentDetails] = useState<IPaymentData>();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        setIsLoading(true);
        const paymentDetails = await getPaymentDetailsById(id);
        setPaymentDetails(paymentDetails?.booking);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const token = getStoredToken();
    if (!token) throw new Error(t("TOKEN_REQUIRED"));

    const transactionData = {
      userTransactionId: data?.userTransactionId,
      bookingId: id,
    };
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}/transaction-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(transactionData),
      }
    );

    const responseData = await response.json();
    if (responseData.success) {
      setLoading(false);
      toast.success(responseData?.message);
    } else {
      setLoading(false);
      toast.error(responseData?.error);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-[90vh] lg:mt-24 mt-14">
      {paymentDetails &&
      paymentDetails.agentPaypalEmail &&
      paymentDetails.paymentInstruction ? (
        <div className="border border-gray-600 lg:p-16 p-4 max-w-2xl bg-primary-50 rounded-md mx-auto text-secondary-50 space-y-5">
          <h2 className="lg:text-8xl text-3xl text-center mx-auto text-red-500">
            <RiMessage2Fill />
          </h2>
          <div className="border-b border-gray-600 pb-2">
            <h2 className="text-xl font-semibold mb-2">{t("EMAIL")}</h2>
            <p className="text-blue-500 underline">
              {paymentDetails.agentPaypalEmail}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {t("PAYMENT_INFORMATION")}
            </h2>
            <p>{paymentDetails.paymentInstruction}</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-2xl lg:p-8 p-2 py-4 lg:py-10 bg-primary-50 text-secondary-50 mx-auto"
          >
            <div className="p-6 flex flex-col items-center space-y-2">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                {t("PAYMENT_CONFIRMATION")}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {t("ENTER_TRANSACTION_ID_VERIFICATION")}
              </p>
            </div>
            <div className="flex  gap-4 items-center ">
              <div className=" flex-1 space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="transaction"
                >
                  {t("TRANSACTION_ID")}
                </label>
                <input
                  className="flex w-full rounded-md border-none outline-none bg-[#2E374A] px-3 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm"
                  id="transaction"
                  placeholder={t("ENTER_TRANSACTION_ID")}
                  defaultValue={paymentDetails?.userTransactionId}
                  {...register("userTransactionId", { required: true })}
                />
              </div>
              <div className="mt-8">
                <button
                  className="rounded-md border-none outline-none bg-blue-600 lg:px-8 px-4 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm flex items-center justify-center"
                  type="submit"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                  ) : (
                    t("SUBMIT")
                  )}
                </button>
              </div>
            </div>
            {errors?.userTransactionId && (
              <p className="text-red-600 mt-1 lg:text-base text-sm">
                {t("TRANSACTION_ID_REQUIRED")}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="lg:text-3xl text-xl text-center max-w-5xl text-white mx-auto leading-10">
          {`${t("PENDING_REQUEST")} "${paymentDetails?.property?.name}". ${t(
            "AGENT_REVIEWING"
          )}`}
        </div>
      )}
    </div>
  );
};

export default page;
