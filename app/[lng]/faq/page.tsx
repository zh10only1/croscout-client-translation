"use server";
import { useTranslation } from "@/app/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

export default async function ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, "faq");

  return (
    <>
      <div className="text-white w-[75%] mx-auto py-16 space-y-8">
        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
            {t("1")}
          </h1>
        </div>
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("2")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("3")}</span>
              </p>
              <p>
                <strong>{t("4")}:</strong>
              </p>
              <p>
                <span>● {t("5")}</span>
              </p>
              <p>
                <span>● {t("6")}</span>
              </p>
              <p>
                <span>● {t("7")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("8")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("9")}:</span>
              </p>
              <p>
                <span>●&nbsp;{t("10")}</span>
              </p>
              <p>
                <span>● {t("11")}</span>
              </p>
              <p>
                <span>● {t("12")}</span>
              </p>
              <p>
                <span>• {t("13")}:</span>
              </p>
              <p>
                <span>● {t("14")}</span>
              </p>
              <p>
                <span>● {t("15")}</span>
              </p>
              <p>
                <span>● {t("16")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("17")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("18")}:</span>
              </p>
              <p>
                <span>● {t("19")}</span>
              </p>
              <p>
                <span>● {t("20")}</span>
              </p>
              <p>
                <span>● {t("21")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("17")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("18")}:</span>
              </p>
              <p>
                <span>● {t("19")}</span>
              </p>
              <p>
                <span>● {t("20")}</span>
              </p>
              <p>
                <span>● {t("21")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("22")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("23")}:</span>
              </p>
              <p>
                <span>● {t("24")}</span>
              </p>
              <p>
                <span>● {t("25")}</span>
              </p>
              <p>
                <span>● {t("26")}</span>
              </p>
              <p>
                <span>● {t("27")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("28")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("29")}:</span>
              </p>
              <p>
                <span>● {t("20")}</span>
              </p>
              <p>
                <span>● {t("31")}</span>
              </p>
              <p>
                <span>● {t("32")}</span>
              </p>
              <p>
                <span>● {t("33")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("34")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("35")}&nbsp;</span>
                <strong>{t("36")}</strong>
                <span>&nbsp;{t("37")}&nbsp;</span>
                <strong>{t("38")}</strong>
                <span>&nbsp;{t("39")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("40")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("41")}:</span>
              </p>
              <p>
                <span>● {t("42")}</span>
              </p>
              <p>
                <span>● {t("43")}</span>
              </p>
              <p>
                <span>● {t("44")}</span>
              </p>
              <p>
                <span>● {t("45")}</span>
              </p>
              <p>
                <span>● {t("46")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("47")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("48")}&nbsp;</span>
                <strong>{t("49")}</strong>
                <span>&nbsp;{t("50")}&nbsp;</span>
                <strong>{t("51")}</strong>
                <span>&nbsp;{t("52")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("53")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("54")}:</span>
              </p>
              <p>
                <span>● {t("55")}</span>
              </p>
              <p>
                <span>● {t("56")}</span>
              </p>
              <p>
                <span>●&nbsp;{t("57")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("58")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("59")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("60")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("62")}</span>
                <strong>&nbsp;</strong>
                <span>{t("62")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("63")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("64")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("65")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("66")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("67")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("68")}</span>
              </p>
              <p>
                <span>● {t("69")}</span>
              </p>
              <p>
                <span>● {t("70")}</span>
              </p>
              <p>
                <span>● {t("71")}</span>
              </p>
              <p>
                <span>● {t("72")}</span>
              </p>
              <p>
                <span>● {t("73")}</span>
              </p>
              <p>
                <span>● {t("74")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("75")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("76")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("77")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("78")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("79")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("80")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("81")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("82")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("83")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("84")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("85")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("86")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("87")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("88")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("89")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("90")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("91")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("92")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("93")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("94")}:</span>
              </p>
              <p>
                <span>● {t("95")}</span>
              </p>
              <p>
                <span>● {t("96")}</span>
              </p>
              <p>
                <span>● {t("97")}</span>
              </p>
              <p>
                <span>● {t("98")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("99")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("100")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("101")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("102")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("103")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("104")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("105")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("106")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("107")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("108")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("109")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("110")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("111")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("112")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("113")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("114")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("115")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("116")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("117")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("118")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("119")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("185")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("120")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("121")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("122")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("123")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("124")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("125")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("126")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("127")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("128")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("129")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("130")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("131")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("132")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("133")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("134")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("135")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("136")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("137")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("138")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("139")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("140")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("141")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("142")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("143")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("144")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("145")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("146")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("147")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("148")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("149")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("150")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("151")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("152")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("153")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("154")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("155")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("156")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("157")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("158")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("159")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("160")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("161")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("162")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("163")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("164")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("165")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("166")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("167")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("168")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("169")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("170")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("171")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("172")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("173")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("174")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("175")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("176")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("177")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("178")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("179")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("180")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("181")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>

          <AccordionPanel>
            <AccordionTitle>
              <strong>{t("182")}</strong>
            </AccordionTitle>
            <AccordionContent>
              <p>
                <span>{t("183")}</span>
              </p>
              <br />
              <p>
                <span>{t("184")}</span>
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </>
  );
}
