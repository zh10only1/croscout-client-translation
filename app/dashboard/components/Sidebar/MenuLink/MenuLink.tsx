"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from "./menuLink.module.css"
import React from 'react'

export default function MenuLink({ item }: any) {
    const pathname = usePathname();
    return (
        <div className='mb-1'>
            <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
                {item.icon}
                {item.title}
            </Link>
        </div>
    )
}
