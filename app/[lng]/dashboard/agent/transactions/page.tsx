"use client"
import { useEffect, useState } from "react";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { User, useAuthContext } from "@/providers/AuthProvider";
import { getAllTrasaction, getTransactionById } from "@/lib/database/getTransactions";
import Loading from "@/components/ui/Loading/Loading";
import { useTranslation } from "@/app/i18n/client";


//? Define the structure of transaction data
interface TransactionData {
    success: boolean;
    transactions: object[];
}

//? TransactionPage component
const TransactionPage = ({ params: { lng } }: { params: { lng: string } }) => {
    const { t } = useTranslation(lng, "transactions");
    //* State to store transaction data
    const [transaction, setTransaction] = useState<TransactionData | null>(null);

    //* Access user data from AuthProvider
    const { user } = useAuthContext();

    //* State to manage loading state
    const [isLoading, setIsLoading] = useState(true);

    //* Fetch transaction data when component mounts or user ID changes
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true); // Set loading to true before fetching data
                if (user && user._id) {

                    //* Fetch transaction data by user ID
                    const data = await getTransactionById(user?._id);
                    console.log(data);
                    setTransaction(data);
                } else {
                    //! Handle the case where user or user._id is undefined
                    console.error('User ID is not available');
                }
                setIsLoading(false);
            } catch (error) {
                console.log('Error occurred, setting isLoading to false', error);
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [user?._id]);

    //* Render loading component if data is still loading
    if (isLoading) {
        return <Loading />;
    }

    //* Render message if no transaction data is found
    if (!transaction?.transactions || (Array.isArray(transaction?.transactions) && transaction.transactions.length === 0)) {
        return (
            <div className='lg:min-h-screen flex-center mt-32 lg:mt-0'>
                <h1 className='lg:text-4xl text-2xl font-bold text-white-50'>{t("NO_PAYMENT_HISTORY")}</h1>
            </div>
        );
    }

    //* Render TransactionForm component if transaction data is available
    return (
        <div className="min-h-screen md:bg-primary-50 md:px-5 py-10">
            {transaction?.success && <TransactionForm lng={lng} transaction={transaction} />}
        </div>
    );
};

export default TransactionPage;
