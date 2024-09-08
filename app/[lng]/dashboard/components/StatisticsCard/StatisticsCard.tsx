import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { useTranslation } from "@/app/i18n/client";

const StatisticsCard =  ({ item, lng }: any) => {
    const { t } = useTranslation(lng, "dashboard");
    return (
        <div className={styles.container}>
            {item?.icon}
            <div className={styles.texts}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.number}>{item.number}</span>
                <span className={styles.detail}>
                    <span className={item.change > 0 ? styles.positive : styles.negative}>
                        {item.change}%
                    </span>{" "}
                    {item.change > 0 ? t('MORE') : t('LESS')} {t('THAN_PREVIOUS_WEEK')}
                </span>
            </div>
        </div>
    );
};

export default StatisticsCard;
