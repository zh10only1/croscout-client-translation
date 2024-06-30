import Image from 'next/image';
import React from 'react'
import CheckMarkIcon from '@/public/icons/checkmark.svg'

type IProps = {
    children: React.ReactNode
}

export default function CheckmarkText({ children }: IProps) {
    return (
        <div className="flex items-center gap-5">
            <Image src={CheckMarkIcon} height={24} width={24} alt="checkmark" />
            <div className="text-[1.25rem] text-white leading-[220%]">{children}</div>
        </div>
    );
}
