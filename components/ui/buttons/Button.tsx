import React from "react";

export default function PrimaryButton({ children, className, ...props }: any) {
    return (
        <div className="flex-center">
            <button
                {...props}
                className={`py-2 lg:py-[15px]  
         rounded-[5px] border border-white hover:border-accent duration-100 bg-primary
         text-white text-lg lg:text-2xl font-semibold ${className}`}
            >
                {children}
            </button>
        </div>
    );
}