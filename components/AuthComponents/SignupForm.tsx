"use client";

import { useModalContext } from "@/providers/ModalProvider";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { registerUser } from "@/lib/database/authUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "@/app/i18n/client";
import { getCurrentLng } from "@/utils/translation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  taxNumber: string;
  role: string;
};

const SignupForm = () => {
  const lng: string = getCurrentLng();
  const { t } = useTranslation(lng, "loginModal");
  const { setLoginModal, setSignupModal, setIsForgotMode } = useModalContext();
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isAgent, setIsAgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // handler for toggle password show option
  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const adminRequestToggle = (checked: boolean) => {
    if (checked) {
      setIsAgent(true);
      register("taxNumber", { required: true });
    } else {
      setIsAgent(false);
      unregister("taxNumber");
    }
  };

  // handle signup submit
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      if (isAgent) {
        data.role = "agent";
      } else {
        data.role = "user";
      }
      data.email = data.email.toLowerCase();
      const dbResponse = await registerUser({ data });
      if (dbResponse?.success) {
        toast.success(
          `${dbResponse?.message} Now Login with your credentials.`,
          { duration: 3000 }
        );
        setSignupModal(false);
        setLoginModal(true);
      } else {
        toast.error(dbResponse?.error);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="relative max-w-xl w-full p-8 md:px-8 px-0 space-y-3 bg-white font-sans mx-auto">
      <button
        onClick={() => {
          setSignupModal(false);
          setIsForgotMode(false);
        }}
        className="absolute hover:text-primary top-0 right-0 text-4xl"
      >
        <IoIosCloseCircle />
      </button>
      <h1 className="text-3xl font-bold text-center text-secondary">
        {t("SIGNUP")}
      </h1>

      {/* Input fields and the form started */}
      <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
        <div className="space-y-2 text-sm">
          <label htmlFor="name" className="block">
            {t("YOUR_NAME")}
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            name="name"
            id="name"
            placeholder={t("NAME")}
            className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none"
          />
          {errors.name && <p className="error">{t("ENTER_YOUR_NAME")}</p>}
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="email" className="block">
            {t("YOUR_EMAIL")}
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            placeholder={t("EMAIL")}
            className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none"
          />
          {errors.email && <p className="error">{t("ENTER_YOUR_EMAIL")}</p>}
        </div>
        <div className="space-y-2 text-sm">
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={isShow ? "text" : "password"}
              name="password"
              id="password"
              placeholder={t("PASSWORD")}
              className="w-full px-4 pt-3 rounded-md border border-indigo-300 focus:outline-none"
            />
            {errors.password && (
              <p className="error">{t("ENTER_YOUR_PASSWORD")}</p>
            )}
            <span
              onClick={handleShowPassword}
              className="text-2xl absolute top-3 right-2 cursor-pointer"
            >
              {isShow ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {isAgent && (
          <div className="space-y-2 text-sm">
            <label htmlFor="taxNumber" className="block">
              {t("TAX_NUMBER")}
            </label>
            <input
              {...register("taxNumber", { required: true })}
              maxLength={11}
              type="text"
              name="taxNumber"
              id="taxNumber"
              placeholder={t("TAX_NUMBER")}
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none"
            />
            {errors.taxNumber && (
              <p className="error">{t("ENTER_TAX_NUMBER")}</p>
            )}
          </div>
        )}
        <div className="flex gap-1 items-center">
          <input
            onChange={(e) => adminRequestToggle(e.target.checked)}
            type="checkbox"
            id="isAgent"
            name="isAgent"
            value="agent"
          />
          <label htmlFor="isAgent">{t("REGISTER_AS_AGENT")}</label>
        </div>
        {/* Register Button */}
        <button
          type="submit"
          className="text-lg flex items-center justify-center rounded-xl relative py-2 h-[52px] w-full bg-rose-500 hover:bg-rose-400 text-white duration-200 overflow-hidden active:bg-rose-400 z-50 font-semibold"
        >
          {isLoading ? (
            <ImSpinner9 className="animate-spin text-[26px]" />
          ) : (
            t("REGISTER")
          )}
        </button>
      </form>

      <p className="text-sm text-center gap-2 flex justify-center sm:px-6">
        {t("ALREADY_HAVE_AN_ACCOUNT")}
        <button
          onClick={() => {
            setLoginModal(true);
            setSignupModal(false);
            setIsForgotMode(false);
          }}
          className="underline hover:text-indigo-600"
        >
          {t("LOG_IN")}
        </button>
      </p>

      {/* Login with social accounts */}
      {/* <div className="flex items-center pt-4 space-x-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <p className="text-sm text-gray-600">{t('LOGIN_WITH_SOCIAL_ACCOUNTS')}</p>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button aria-label="Log in with Google" className="p-3 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                </button>
                <button aria-label="Log in with Twitter" className="p-3 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path></svg>
                </button>
                <button aria-label="Log in with GitHub" className="p-3 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path></svg>
                </button>
            </div> */}
    </div>
  );
};

export default SignupForm;
