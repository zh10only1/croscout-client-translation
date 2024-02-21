'use client';

import { Tooltip } from "flowbite-react";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    maximumGuest: number;
    totalGuests: number
    onChange: (value: number) => void;
}

const GuestCounter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange,
    maximumGuest,
    totalGuests
}) => {
    const onAdd = useCallback(() => {
        if (maximumGuest <= value || maximumGuest <= totalGuests) {
            return;
        }
        else {
            onChange(value + 1);
        }
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 0) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className=" w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                    <AiOutlineMinus />
                </div>
                <div
                    className=" font-light  text-xl  text-neutral-600 select-none"
                >
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className=" w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                    {
                        maximumGuest <= totalGuests ?
                            <Tooltip content={`Maximum guest ${maximumGuest}`}>
                                <AiOutlinePlus />
                            </Tooltip>
                            :
                            <AiOutlinePlus />
                    }
                </div>
            </div>
        </div>
    );
}

export default GuestCounter;