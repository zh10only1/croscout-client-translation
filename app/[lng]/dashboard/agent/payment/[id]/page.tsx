"use client";
import { IPaymentData } from "@/app/[lng]/dashboard/user/payment-details/[id]/page";
import { getPaymentDetailsById } from "@/lib/database/getPaymentDetails";
import { getStoredToken } from "@/utils/tokenStorage";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useTranslation } from "@/app/i18n/client";

type Inputs = {
  agentPaypalEmail: string;
  paymentInstruction: string;
};
const page = () => {
    const [paymentDetails, setPaymentDetails] = useState<IPaymentData>();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>();
    const { id, lng } = useParams();
    const { t } = useTranslation(`${lng}`, "paymentDetails");
  
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
    }, [id]);
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const token = getStoredToken();
      if (!token) throw new Error(t("LOGIN_FIRST"));
  
      const postData = {
        agentPaypalEmail: data.agentPaypalEmail,
        paymentInstruction: data.paymentInstruction,
        bookingId: id,
      };
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}/payment-details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(postData),
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
  
    return (
      <div className="min-h-screen lg:mt-32">
        {/*//* ============== Payment Details Form =================*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-2xl lg:p-5 bg-primary-50 text-secondary-50 mx-auto"
        >
          {/*//* Payment Details Header */}
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              {t("PAYMENT_DETAILS_HEADER")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("PAYMENT_DETAILS_DESCRIPTION")}
            </p>
          </div>
  
          {/*//? Payment Details Inputs */}
          <div className="p-6 space-y-4">
            {/*//? Paypal Email Input */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                {t("PAYPAL_EMAIL")}
              </label>
              <input
                className="flex w-full rounded-md border-none outline-none bg-[#2E374A] px-3 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm;"
                id="email"
                placeholder={t("PAYPAL_EMAIL_PLACEHOLDER")}
                defaultValue={paymentDetails?.agentPaypalEmail}
                type="email"
                {...register("agentPaypalEmail", { required: true })}
              />
              {errors?.agentPaypalEmail && (
                <p className="text-red-600 mt-1 lg:text-base text-sm">
                  {t("PAYPAL_EMAIL_REQUIRED")}
                </p>
              )}
            </div>
  
            {/*//? Description Textarea */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="description"
              >
                {t("DESCRIPTION")}
              </label>
              <textarea
                rows={4}
                defaultValue={paymentDetails?.paymentInstruction}
                className="h-10 bg-[#2E374A] resize-none lg:text-base placeholder:text-secondary-50 placeholder:text-sm flex w-full rounded-md border-none outline-none px-3 py-2 text-sm min-h-[100px]"
                id="description"
                placeholder={t("DESCRIPTION_PLACEHOLDER")}
                {...register("paymentInstruction", { required: true })}
              ></textarea>
              {errors?.paymentInstruction && (
                <p className="text-red-600 mt-1 lg:text-base text-sm">
                  {t("DESCRIPTION_REQUIRED")}
                </p>
              )}
            </div>
  
            {/*//* Transaction ID Input (if exists) */}
            <div>
              {paymentDetails?.userTransactionId && (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="transactionID"
                  >
                    {t("TRANSACTION_ID_FROM_USER")}
                  </label>
                  <input
                    className="flex w-full rounded-md border-none outline-none bg-[#2E374A] px-3 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm;"
                    id="transactionID"
                    placeholder={t("TRANSACTION_ID_PLACEHOLDER")}
                    defaultValue={paymentDetails?.userTransactionId}
                    readOnly
                    type="text"
                  />
                </div>
              )}
            </div>
          </div>
  
          {/*//? Submit Button */}
          <div className="flex items-center justify-center p-6 w-full">
            {
              //? If agentPaypalEmail exists, show disabled button indicating payment request sent
              paymentDetails?.agentPaypalEmail ? (
                <button
                  className="rounded-md hover:border-white active:scale-95 duration-150 outline-none border border-accent px-3 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm"
                  type="submit"
                  disabled
                >
                  {t("PAYMENT_REQUEST_SENT")}
                </button>
              ) : (
                //? Otherwise, show active button to submit payment request
                <button
                  className="rounded-md hover:border-white active:scale-95 duration-150 outline-none border border-accent px-3 py-3 text-sm lg:text-base placeholder:text-secondary-50 placeholder:text-sm flex items-center justify-center"
                  type="submit"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                  ) : (
                    t("SEND_PAYMENT_REQUEST")
                  )}
                </button>
              )
            }
          </div>
        </form>
      </div>
    );
  };
  
  export default page;
