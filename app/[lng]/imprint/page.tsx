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
    <div className="text-white w-[75%] mx-auto py-16 space-y-8">
      {/* Main Title */}
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
        {t("IMPRESSUM_TITLE")}
      </h1>

      {/* Legal Information Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-lg">{t("IMPRESSUM_CONTENT_PART_1")}</p>
          <p className="text-lg font-medium">{t("IMPRESSUM_CONTENT_PART_2")}</p>
        </div>

        {/* Company Details */}
        <div className="space-y-2 bg-gray-900/50 p-6 rounded-lg">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[100px]">
              {t("IMPRESSUM_CONTENT_PART_3_LEFT")}
            </span>
            <span>{t("IMPRESSUM_CONTENT_PART_3_RIGHT")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[100px]">
              {t("IMPRESSUM_CONTENT_PART_4_LEFT")}
            </span>
            <span>{t("IMPRESSUM_CONTENT_PART_4_RIGHT")}</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-1 bg-gray-900/50 p-6 rounded-lg">
          <p>{t("IMPRESSUM_CONTENT_PART_5")}</p>
          <p>{t("IMPRESSUM_CONTENT_PART_6")}</p>
          <p>{t("IMPRESSUM_CONTENT_PART_7")}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 bg-gray-900/50 p-6 rounded-lg">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[100px]">
              {t("IMPRESSUM_CONTENT_PART_8_LEFT")}
            </span>
            <span>{t("IMPRESSUM_CONTENT_PART_8_RIGHT")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[100px]">
              {t("IMPRESSUM_CONTENT_PART_9")}
            </span>
            <a
              href="mailto:office@croscout.eu"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              office@croscout.eu
            </a>
          </div>
        </div>

        {/* Legal Notices */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p>{t("IMPRESSUM_CONTENT_PART_10")}</p>
            <a
              href="https://ec.europa.eu/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors block pl-4"
            >
              https://ec.europa.eu/odr
            </a>
          </div>

          <p className="text-gray-300 italic">
            {t("IMPRESSUM_CONTENT_PART_11")}
          </p>
        </div>

        {/* Responsible Person */}
        <div className="space-y-2 mt-8">
          <p className="text-lg">{t("IMPRESSUM_CONTENT_PART_12")}</p>
          <p className="pl-4 text-gray-300">{t("IMPRESSUM_CONTENT_PART_13")}</p>
        </div>
      </div>
    </div>
  );
}
