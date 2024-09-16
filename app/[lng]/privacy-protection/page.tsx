"use server";
import { useTranslation } from "@/app/i18n";

export default async function ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, "privacyProtection");

  return (
    <div className="text-white w-[75%] mx-auto py-16">
      <h5>{t("1")}</h5>
      <p>{t("2")}</p>
      <p>{t("3")}</p>
      <p>
        {t("4")}
        <br />
        {t("5")}
        <br />
        {t("6")}
        <br />
        {t("7")}
        <br />
        {t("8")}
        <br />
        {t("9")}
        <br />
        {t("10")}: <a href="mailto:office@croscout.eu">office@croscout.eu</a>
      </p>
      <p>{t("11")}</p>
      <p>{t("12")}</p>
      <p>{t("13")}</p>
      <ul>
        <li>{t("14")}</li>
        <li>{t("15")}</li>
        <li>{t("16")}</li>
        <li>{t("17")}</li>
      </ul>
      <p>{t("18")}</p>
      <p>{t("19")}</p>
      <p>{t("20")}</p>
      <p>{t("21")}</p>
      <p>{t("22")}</p>
      <ul>
        <li>{t("23")}</li>
        <li>{t("24")}</li>
        <li>{t("25")}</li>
        <li>{t("26")}</li>
        <li>{t("27")}</li>
        <li>{t("28")}</li>
      </ul>
      <p>{t("29")}</p>
      <p>{t("30")}</p>
      <p>{t("31")}</p>
      <p>{t("32")}</p>
      <p>{t("33")}</p>
      <p>{t("34")}</p>
      <ul>
        <li>
          {t("35")}
          <ul>
            <li>{t("36")}</li>
            <li>{t("37")}</li>
            <li>{t("38")}</li>
            <li>{t("39")}</li>
          </ul>
        </li>
      </ul>
      <p>{t("40")}</p>
      <p>{t("41")}</p>
      <p>{t("42")}</p>
      <ul>
        <li>{t("43")}</li>
        <li>{t("44")}</li>
      </ul>
      <p>{t("45")}</p>
      <ul>
        <li>{t("46")}</li>
        <li>{t("47")}</li>
      </ul>
      <p>{t("48")}</p>
      <ul>
        <li>{t("49")}</li>
        <li>{t("50")}</li>
      </ul>
      <p>{t("51")}</p>
      <p>{t("52")}</p>
      <p>{t("53")}</p>
      <p>{t("54")}</p>
      <p>{t("55")}</p>
      <p>{t("56")}</p>
      <p>{t("57")}</p>
      <ul>
        <li>{t("58")}</li>
        <li>{t("59")}</li>
        <li>{t("60")}</li>
        <li>{t("61")}</li>
        <li>{t("62")}</li>
        <li>{t("63")}</li>
        <li>{t("64")}</li>
        <li>{t("65")}</li>
        <li>{t("66")}</li>
      </ul>
      <p>{t("67")}</p>
      <p>{t("68")}</p>
      <ul>
        <li>{t("69")}</li>
        <li>{t("70")}</li>
        <li>{t("71")}</li>
      </ul>
      <p>{t("72")}</p>
      <p>{t("73")}</p>
      <p>{t("74")}</p>
      <p>{t("75")}</p>
      <ul>
        <li>
          {t("76")} <a href="https://www.hivelocity.net/">hivelocity.net</a>
        </li>
        <li>{t("77")}</li>
        <li>
          {t("78")}{" "}
          <a href="https://www.hivelocity.net/legal/">
            https://www.hivelocity.net/legal/
          </a>
        </li>
      </ul>
      <p>{t("79")}</p>
      <p>{t("80")}</p>
      <p>{t("81")}</p>
      <p>{t("82")}</p>
      <ul>
        <li>{t("83")}</li>
        <li>{t("84")}</li>
        <li>{t("85")}</li>
        <li>{t("86")}</li>
      </ul>
      <p>{t("87")}</p>
      <p>{t("88")}</p>
      <p>{t("89")}</p>
      <p>{t("90")}</p>
      <p>{t("91")}</p>
      <p>{t("92")}</p>
      <p>{t("93")}</p>
      <p>{t("94")}</p>
      <ul>
        <li>{t("95")}</li>
        <li>{t("96")}</li>
      </ul>
      <p>{t("97")}</p>
      <p>{t("98")}</p>
      <p>{t("99")}</p>
      <p>{t("100")}</p>
      <ul>
        <li>{t("101")}</li>
        <li>{t("102")}</li>
        <li>
          {t("103")}{" "}
          <a href="https://marketingplatform.google.com/intl/de/about/analytics/">
            https://marketingplatform.google.com/intl/de/about/analytics/
          </a>
        </li>
        <li>
          {t("104")}{" "}
          <a href="https://policies.google.com/privacy?hl=de">
            https://policies.google.com/privacy?hl=de
          </a>
        </li>
        <li>{t("105")}</li>
        <li>
          {t("106")}{" "}
          <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
            https://tools.google.com/dlpage/gaoptout?hl=de
          </a>
        </li>
      </ul>
      <p>{t("107")}</p>
      <p>{t("108")}</p>
      <p>{t("109")}</p>
      <ul>
        <li>{t("110")}</li>
        <li>{t("111")}</li>
      </ul>
      <p>{t("112")}</p>
      <p>{t("113")}</p>
      <p>{t("114")}</p>
      <p>{t("115")}</p>
      <ul>
        <li>
          <strong>{t("116")}</strong>
          <p>{t("117")}</p>
          <p>{t("118")}</p>
          <p>{t("119")}</p>
          <p>
            {t("120")}{" "}
            <a href="https://www.google.de/maps">https://www.google.de/maps</a>
          </p>
          <p>
            {t("121")}{" "}
            <a href="https://policies.google.com/privacy">
              https://policies.google.com/privacy
            </a>
          </p>
          <p>
            {t("122")}{" "}
            <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
              https://tools.google.com/dlpage/gaoptout?hl=de
            </a>
          </p>
        </li>
      </ul>
      <p>{t("123")}</p>
      <p>{t("124")}</p>
      <p>{t("125")}</p>
      <p>{t("126")}</p>
      <p>
        {t("127")}{" "}
        <a href="https://fonts.google.com/">https://fonts.google.com/</a>
      </p>
      <p>
        {t("128")}{" "}
        <a href="https://policies.google.com/privacy">
          https://policies.google.com/privacy
        </a>
      </p>

      <p>{t("129")}</p>
      <p>{t("130")}</p>

      <p>{t("131")}</p>
      <p>{t("132")}</p>
    </div>
  );
}
