"use server";
import { useTranslation } from "@/app/i18n";

export default async function ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, "termsAndConditions");

  return (
    <div className="text-white w-[75%] mx-auto py-16 space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-4">
          {t("TERMS_AND_CONDITIONS_TITLE")}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          {t("TERMS_AND_CONDITIONS_INTRO")}
        </p>
        <p className="text-lg font-medium text-gray-300 italic">
          {t("TERMS_AND_CONDITIONS_CLOSING")}
        </p>
      </div>

      {/* Overview Section */}
      <div className="bg-gray-900/50 p-8 rounded-lg space-y-4">
        <h2 className="text-2xl font-semibold mb-4">{t("OVERVIEW_TITLE")}</h2>
        <ol className="space-y-3 list-decimal list-inside">
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-1"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_CONTRACT_RELATIONS")}
            </a>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-2"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_WARRANTY")}
            </a>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-3"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_LIABILITY")}
            </a>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-4"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_PRIVACY")}
            </a>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-5"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_COPYRIGHT")}
            </a>
          </li>
          <li className="hover:text-gray-300 transition-colors">
            <a
              href="#section-6"
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {t("OVERVIEW_MISCELLANEOUS")}
            </a>
          </li>
        </ol>
      </div>

      {/* Section 1 */}
      <section
        id="section-1"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_1_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_1_PARAGRAPH_1")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_1_PARAGRAPH_2")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_1_PARAGRAPH_3")}
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section
        id="section-2"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_2_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_2_PARAGRAPH_1")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_2_PARAGRAPH_2")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_2_PARAGRAPH_3")}
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section
        id="section-3"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_3_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_3_PARAGRAPH_1")}
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section
        id="section-4"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_4_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_4_PARAGRAPH_1")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_4_PARAGRAPH_2")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_4_PARAGRAPH_3")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_4_PARAGRAPH_4")}
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section
        id="section-5"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_5_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_5_PARAGRAPH_1")}
          </p>
        </div>
      </section>

      {/* Section 6 */}
      <section
        id="section-6"
        className="bg-gray-900/50 p-8 rounded-lg space-y-6 scroll-mt-8"
      >
        <h2 className="text-2xl font-semibold text-blue-300">
          {t("SECTION_6_TITLE")}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_6_PARAGRAPH_1")}
          </p>
          <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
            {t("SECTION_6_PARAGRAPH_2")}
          </p>
          <p className="text-gray-400 italic mt-6">{t("SECTION_6_DATE")}</p>
        </div>
      </section>
    </div>
  );
}
