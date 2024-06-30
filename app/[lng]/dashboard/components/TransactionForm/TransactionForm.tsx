// Import necessary modules and libraries
import React from 'react';
import { format } from 'date-fns';

// Define props interface for TransactionForm component
interface TransactionFormProps {
    transaction?: any; // Replace 'any' with the actual type of the transaction
    agentTransaction?: any; // Define type for agent transactions if needed
}

// Define interface for transaction item
interface TransactionItem {
    transactionId?: string;
    booking?: string;
    createdAt?: string;
    amount?: number;
    paymentMethod: string;
}

// Define TransactionForm component
const TransactionForm: React.FC<TransactionFormProps> = ({ transaction }) => {

    // Render the component
    return (
        <div className=''>
            <div className="relative overflow-x-auto rounded-lg ">

                {/*//* Table for displaying transaction details */}
                <table className="w-full text-left p-4 rtl:text-right rounded-t-xl text-secondary-50 whitespace-nowrap">

                    {/* Table header */}
                    <thead className="my-3 bg-[#2E374A] p-5 ">
                        <tr>
                            <th className="p-5 font-semibold">
                                #
                            </th>
                            <th className="p-5 font-semibold">
                                Transaction ID
                            </th>
                            <th className="p-5 font-semibold">
                                Booking ID
                            </th>
                            <th className="p-5 font-semibold">
                                Payment Method
                            </th>
                            <th className="p-5 font-semibold">
                                Transaction Date
                            </th>
                            <th className="p-5 font-semibold">
                                Amount
                            </th>
                        </tr>
                    </thead>

                    {/* Table body */}
                    <tbody>
                        {/* Map through transactions and render each transaction item */}
                        {
                            transaction?.transactions?.map((item: TransactionItem, indx: number) => (
                                <tr key={indx} className="hover:bg-[#2E374A] hover:rounded-lg bg-primary-50 my-3 p-2 cursor-pointer whitespace-nowrap">
                                    <td className="px-6 py-4 m-5 font-medium">
                                        {indx + 1}
                                    </td>
                                    <td className="px-6 py-4 m-5 font-medium">
                                        {item?.transactionId}
                                    </td>
                                    <td className="px-6 py-4 m-5">
                                        {item?.booking}
                                    </td>
                                    <td className="px-6 py-4 m-5">
                                        {item?.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 m-5">

                                        {/*//? Format transaction date using date-fns */}
                                        {format(new Date(item?.createdAt || ''), "MMM dd, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 m-5">

                                        {/*//? Display amount with Euro symbol */}
                                        <span className='font-semibold mr-.5'>€ </span>{item?.amount}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Export TransactionForm component
export default TransactionForm;
