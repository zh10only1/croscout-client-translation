"use client"
// Import necessary React hooks and components
import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { getDashboardStats } from "@/lib/database/getDashboardStats";
import StatisticsCard from "./components/StatisticsCard/StatisticsCard";
import Transactions from "./components/Transections/Transections";
import Chart from "./components/Chart/Chart";
import Loading from "@/components/ui/Loading/Loading";
import styles from "@/app/[lng]/dashboard/components/dashboard.module.css";
import { MdSupervisedUserCircle } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaHandHoldingDollar } from "react-icons/fa6";

// Define the interface for booking data
export interface IBooking {
    guest: string;
    property: string;
    owner: string;
    price: string;
    totalGuests: string;
    startDate: string; // Assuming you want to keep it as a string for frontend
    endDate: string; // Assuming you want to keep it as a string for frontend
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string; // Assuming you want to keep it as a string for frontend
    updatedAt: string; // Assuming you want to keep it as a string for frontend
    agentPaypalEmail?: string;
    paymentInstruction?: string;
    userTransactionId?: string;
}

// Define the interface for dashboard statistics
export interface DashboardStats {
    userCount?: number;
    propertyCount?: number;
    totalRevenue?: number;
    latestBookings?: IBooking[];
    agentProperties?: number;
    agentRevenue?: number;
    agentBookings?: number;
    latestAgentBookings?: IBooking[];
}

// Dashboard component that fetches and displays dashboard statistics
const Dashboard = () => {
    // State to track loading status and dashboard statistics
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const [dashboardStats, setDashboardStats] = useState<DashboardStats>();

    // Fetch dashboard statistics when the user ID changes
    useEffect(() => {
        if (!user?._id) {
            return;
        }
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                const data = await getDashboardStats(user._id);
                setDashboardStats(data.stats);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardStats();
    }, [user?._id]);

    // Conditional rendering based on loading state
    if (loading) {
        return <Loading />;
    }

    // Prepare data for statistics cards
    const cards = [
        {
            id: 1,
            title: user?.role === 'admin' ? "Total Users" : 'Total Properties',
            number: user?.role === 'admin' ? dashboardStats?.userCount : dashboardStats?.agentProperties,
            change: 12,
            icon: <MdSupervisedUserCircle size={20} />
        },
        {
            id: 2,
            title: user?.role === 'admin' ? "Total Properties" : "Total Bookings",
            number: user?.role === 'admin' ? dashboardStats?.propertyCount : dashboardStats?.agentBookings,
            change: -2,
            icon: <HiOutlineHomeModern size={20} />
        },
        {
            id: 3,
            title: user?.role === 'admin' ? "Total Revenue" : "Revenue",
            number: user?.role === 'admin' ? dashboardStats?.totalRevenue : dashboardStats?.agentRevenue,
            change: 18,
            icon: <FaHandHoldingDollar size={20} />
        },
    ];

    // Determine which bookings to display based on user role
    const latestBookings = dashboardStats?.latestAgentBookings || dashboardStats?.latestBookings;

    // Render the dashboard with statistics cards and transactions
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    {cards.map((item) => (
                        <StatisticsCard item={item} key={item.id} />
                    ))}
                </div>
                <div className="my-5">
                    <Transactions dashboardStats={latestBookings} />
                </div>
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;