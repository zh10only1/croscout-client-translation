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
    <div className="text-white w-[75%] mx-auto py-16">
      <h5>{t("TERMS_AND_CONDITIONS_TITLE")}</h5>
      <p>{t("TERMS_AND_CONDITIONS_INTRO")}</p>
      <p>{t("TERMS_AND_CONDITIONS_CLOSING")}</p>

      <h5>{t("OVERVIEW_TITLE")}</h5>
      <ol>
        <li>
          <a href="#section-1">
            {t("OVERVIEW_CONTRACT_RELATIONS")}
          </a>
        </li>
        <li>
          <a href="#section-2">{t("OVERVIEW_WARRANTY")}</a>
        </li>
        <li>
          <a href="#section-3">{t("OVERVIEW_LIABILITY")}</a>
        </li>
        <li>
          <a href="#section-4">{t("OVERVIEW_PRIVACY")}</a>
        </li>
        <li>
          <a href="#section-5">{t("OVERVIEW_COPYRIGHT")}</a>
        </li>
        <li>
          <a href="#section-6">{t("OVERVIEW_MISCELLANEOUS")}</a>
        </li>
      </ol>

      <section id="section-1">
        <h5>{t("SECTION_1_TITLE")}</h5>
        <p>{t("SECTION_1_PARAGRAPH_1")}</p>
        <p>{t("SECTION_1_PARAGRAPH_2")}</p>
        <p>{t("SECTION_1_PARAGRAPH_3")}</p>
      </section>

      <section id="section-2">
        <h3>{t("SECTION_2_TITLE")}</h3>
        <p>{t("SECTION_2_PARAGRAPH_1")}</p>
        <p>{t("SECTION_2_PARAGRAPH_2")}</p>
        <p>{t("SECTION_2_PARAGRAPH_3")}</p>
      </section>

      <section id="section-3">
        <h3>{t("SECTION_3_TITLE")}</h3>
        <p>{t("SECTION_3_PARAGRAPH_1")}</p>
      </section>

      <section id="section-4">
        <h3>{t("SECTION_4_TITLE")}</h3>
        <p>{t("SECTION_4_PARAGRAPH_1")}</p>
        <p>{t("SECTION_4_PARAGRAPH_2")}</p>
        <p>{t("SECTION_4_PARAGRAPH_3")}</p>
        <p>{t("SECTION_4_PARAGRAPH_4")}</p>
      </section>

      <section id="section-5">
        <h3>{t("SECTION_5_TITLE")}</h3>
        <p>{t("SECTION_5_PARAGRAPH_1")}</p>
      </section>

      <section id="section-6">
        <h3>{t("SECTION_6_TITLE")}</h3>
        <p>{t("SECTION_6_PARAGRAPH_1")}</p>
        <p>{t("SECTION_6_PARAGRAPH_2")}</p>
        <p>{t("SECTION_6_DATE")}</p>
      </section>
    </div>
  );
}
