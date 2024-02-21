import React, { useState } from 'react';
import "./addSearchValueBtn.css"
import { MdLocationOn } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { LuUsers2 } from 'react-icons/lu';

const AddSearchValueBtn = ({ children, className, isBorderX, id, ...props }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="flex items-center">
            {isBorderX && <div id="border-1" className={`h-8 mx-1 border opacity-50 border-[#A9A9A9] ${isHovered ? 'border-primary' : ''}`}></div>}
            <button
                {...props}
                type="button"
                id="ad-location"
                className={"px-3 rounded-full flex items-center flex-col md:flex-row  gap-2 duration-300 py-2 md:py-5  hover:bg-secondary md:px-[2.875rem]"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className='text-base md:text-2xl hidden md:block'>
                    {
                        id === 'add-location' && <MdLocationOn />
                    }
                    {
                        id === 'add-dates' && <SlCalender />
                    }
                    {
                        id === 'add-guests' && <LuUsers2 />
                    }
                </span>
                <span>{children}</span>
            </button>
            {isBorderX && <div id="border-2" className={`h-8 mx-1 border opacity-50 border-[#A9A9A9] ${isHovered ? 'border-primary' : ''}`}></div>}
        </div>
    );
};

export default AddSearchValueBtn;
