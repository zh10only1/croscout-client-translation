"use client";

import LoginForm from "@/components/AuthComponents/LoginForm";
import { useModalContext } from "@/providers/ModalProvider";

const LoginModal = ({ lng }: { lng: string }) => {
  const { loginModal, setLoginModal } = useModalContext();

  return (
    <div
      className={`fixed px-2 md:px-0 z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${
        loginModal ? "scale-100" : "scale-0"
      }`}
    >
      <div
        className={`max-w-2xl w-full bg-white rounded-lg text-black relative p-5 duration-300 ${
          loginModal ? "scale-100" : "scale-0"
        }`}
      >
        <LoginForm lng={lng} />
      </div>
    </div>
  );
};

export default LoginModal;
