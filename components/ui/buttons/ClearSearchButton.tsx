"use client"

import { IoMdClose } from "react-icons/io";

const ClearSearchButton = ({ ...props }) => {
    return (
        <div className="mt-5">
            <button
                className="py-3 px-5 border duration-200 border-rose-400 text-rose-400 rounded-lg flex-center gap-x-2"
                {...props}
            ><IoMdClose className="text-2xl" /> <span>Clear Search</span></button>
        </div>
    );
};

export default ClearSearchButton;