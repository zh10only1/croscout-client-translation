"use server";
import { useTranslation } from "@/app/i18n";

export default async function ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, "imprint");

  return (
    <div className="text-white w-[75%] mx-auto py-16">
      <h5>{t("IMPRESSUM_TITLE")}</h5>
      <p>
        {t("IMPRESSUM_CONTENT_PART_1")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_2")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_3")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_4")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_5")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_6")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_7")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_8")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_9")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_10")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_11")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_12")}
        <br />
        {t("IMPRESSUM_CONTENT_PART_13")}
      </p>
    </div>
  );
}
