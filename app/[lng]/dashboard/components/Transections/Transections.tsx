'use client';
import Image from "next/image";
import styles from "./transactions.module.css";
import { format } from "date-fns";
import { useAuthContext } from "@/providers/AuthProvider";
import { MdShoppingBag } from "react-icons/md";
import { useTranslation } from "@/app/i18n/client";


const Transactions = ({ dashboardStats, lng }: { dashboardStats: any; lng: string; }) => {
  const { t } = useTranslation(lng, "dashboard");
  const { user } = useAuthContext();
  return (
    <div className={` ${styles.container}`}>
      <h2 className="text-secondary-50 mb-4 flex items-center gap-4"> <MdShoppingBag className="text-2xl" /> {t("LATEST_BOOKINGS")}</h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <table className={styles.table}>
          <thead className={`${styles.thead}`}>
            <tr className=" font-semibold bg-[#2E374A] rounded-t-md p-1 text-white-50">
              <td>{t("GUEST_NAME")}</td>
              {
                user?.role === "admin" &&
                <td>{t("AGENT_NAME")}</td>
              }
              <td className=" md:ml-0">{t("STATUS")}</td>
              <td className=" md:ml-0">{t("DATE")}</td>
              <td className="">{t("AMOUNT")}</td>
            </tr>
          </thead>
          <tbody className={`${styles.tbody} text-gray-400`}>
            {
              dashboardStats?.map((item: any, indx: number) => <tr key={indx}>
                <td width={420}>
                  <div className={styles.user}>
                    {item?.guest?.name}
                  </div>
                </td>
                {
                  user?.role === "admin" &&
                  <td>
                    <div className={styles.user}>
                      {item?.owner?.name}
                    </div>
                  </td>
                }

                <td>
                  <span className={`${styles.status} ${item?.status === t("confirmed") ? styles.done : styles.pending}`}>
                    {item?.status}
                  </span>
                </td>
                <td>{format(new Date(item?.createdAt), "MMM dd, yyyy")}</td>
                <td>€ {item?.price}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
