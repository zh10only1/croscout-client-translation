"use client";

import SignupForm from "@/components/AuthComponents/SignupForm";
import { useModalContext } from "@/providers/ModalProvider";

const SignupModal = ({ lng }: { lng: string }) => {
  const { signupModal } = useModalContext();

  return (
    <div
      className={`fixed px-2 md:px-0 z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${
        signupModal ? "scale-100" : "scale-0"
      }`}
    >
      <div
        className={`max-w-2xl w-full bg-white rounded-lg text-black relative p-5 duration-300 ${
          signupModal ? "scale-100" : "scale-0"
        }`}
      >
        <SignupForm lng={lng} />
      </div>
    </div>
  );
};

export default SignupModal;
