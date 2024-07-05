"use client"
// This line is typically used to indicate that the file should be processed by a specific tool or environment.

// Import necessary React hooks and components
import React, { ReactNode } from 'react';
import { useModalContext } from '@/providers/ModalProvider';
import { useAuthContext } from '@/providers/AuthProvider';
import Sidebar from './components/Sidebar/Sidebar';
import Loading from '@/components/ui/Loading/Loading';
import styles from "@/app/[lng]/dashboard/components/dashboard.module.css";

// Define the props for the DashboardLayout component
interface DashboardLayoutProps {
    children: ReactNode;
}

//* DashboardLayout component that provides a consistent layout for the dashboard
export default function DashboardLayout({ children }: DashboardLayoutProps) {

    //* Use the ModalContext to control the sidebar toggle state
    const { setSidebarToggle, sidebarToggle } = useModalContext();

    //* Use the AuthContext to check if the user is loading
    const { loading } = useAuthContext();

    //* If the user is loading, render the Loading component
    if (loading) {
        return <Loading />;
    }

    //* Render the main layout with a sidebar and main content area
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.menu}`}>
                <Sidebar />
            </div>
            <div className={`${styles.contain} overflow-hidden min-h-screen py-20 scrollbar ${sidebarToggle ? "blur-md pointer-events-auto" : ""}`}>
                <div className='mb-4'></div>
                {children}
            </div>
        </div>
    );
}