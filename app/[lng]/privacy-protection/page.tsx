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
    <div className="text-white w-[75%] mx-auto py-16 space-y-8">
      {/* Main Content */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
          {t("1")}
        </h1>

        {/* Introduction Paragraphs */}
        <div className="space-y-4">
          <p className="text-lg">{t("2")}</p>
        </div>

        {/* Contact Information */}
        <h3 className="text-xl font-bold">{t("3")}</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg space-y-2">
          <p>{t("4")}</p>
          <p>{t("5")}</p>
          <p>{t("6")}</p>
          <p>{t("7")}</p>
          <p>{t("8")}</p>
          <p>{t("9")}</p>
          <p>
            {t("10")}:
            <a
              href="mailto:office@croscout.eu"
              className="text-blue-400 hover:text-blue-300 transition-colors ml-2"
            >
              office@croscout.eu
            </a>
          </p>
        </div>

        {/* General Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("11")}</h3>
          <p>{t("12")}</p>
        </div>

        {/* List Section */}
        <h3 className="text-xl font-bold">{t("13")}</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>{t("14")}</li>
            <li>{t("15")}</li>
            <li>{t("16")}</li>
            <li>{t("17")}</li>
          </ul>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          {[18, 19, 20].map((num) => (
            <div className="py-1 space-y-4">
              <p>{t(String(num)).split(":")[0].trim()}:</p>
              <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                <ul className="space-y-4 list-disc list-inside">
                  <li className="space-y-2">
                    {t(String(num)).split(":")[1].trim()}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{t("21")}</h3>
          <p>{t("22")}</p>
          {/* Secondary List */}
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <ul className="list-disc list-inside space-y-2">
              {[23, 24, 25, 26, 27, 28].map((num) => (
                <li key={num}>{t(String(num))}</li>
              ))}
              <li>
                {t("29")}: {t("30")}
              </li>
              <li>
                {t("31")}: {t("32")}
              </li>
            </ul>
          </div>
        </div>

        <div></div>

        {/* Nested List Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("33")}</h3>
          <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              <li className="space-y-2">{t("34")}</li>
              <li className="space-y-2">
                {t("35")}
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>{t("36")}</li>
                  <li>{t("37")}</li>
                  <li>{t("38")}</li>
                  <li>{t("39")}</li>
                </ul>
              </li>
            </ul>
            <p>{t("40")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("41")}</h3>
          <p>{t("42")}</p>
          <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              <li className="space-y-2">{t("43")}</li>
              <li className="space-y-2">{t("44")}</li>
            </ul>
          </div>
          <div className="py-3 space-y-4">
            <p>{t("45")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("46")}</li>
                <li className="space-y-2">{t("47")}</li>
              </ul>
            </div>
          </div>
          <div className="py-1 space-y-4">
            <p>{t("48")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("49")}</li>
                <li className="space-y-2">{t("50")}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("51").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("51").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("52").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("52").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("53").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("53").split(":")[1].trim()}</li>
                <li className="space-y-2">
                  {t("54")}. {t("55")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("56")}</h3>
          <p>{t("57")}</p>
          <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              {[58, 59, 60, 61, 62, 63, 64, 65, 66].map((num) => (
                <li className="space-y-2">{t(String(num))}</li>
              ))}
            </ul>
            <p>{t("67")}</p>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("68")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("69")}</li>
                <li className="space-y-2">{t("70")}</li>
                <li className="space-y-2">{t("71")}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("72").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("72").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("73").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("73").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("74").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("74").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("75").split(":")[0].trim()}</h3>
          <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              <li>
                {t("76")}{" "}
                <a
                  href="https://www.hivelocity.net/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hivelocity.net
                </a>
              </li>
              <li className="space-y-2">
                <span className="bold">{t("77").split(":")[0].trim()}: </span>
                {t("77").split(":")[1].trim()}
              </li>
              <li>
                {t("78")}{" "}
                <a
                  href="https://www.hivelocity.net/legal/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hivelocity.net/legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("79")}</h3>
          <p>
            <a
              href="https://www.croscout.eu/"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              croscout.eu
            </a>
          </p>
          <p>{t("81")}</p>
          <div className="py-1 space-y-4">
            <p>{t("82")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("83")}</li>
                <li className="space-y-2">{t("84")}</li>
                <li className="space-y-2">{t("85")}</li>
                <li className="space-y-2">{t("86")}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("87").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("87").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("88").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("88").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("89").split(":")[0].trim()}:</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("89").split(":")[1].trim()}</li>
              </ul>
            </div>
          </div>

          <div className="py-1 space-y-4">
            <p>{t("90")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("91")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("92")}</h3>
          <p>{t("93")}</p>
          <div className="py-1 space-y-4">
            <p>{t("94")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("95")}</li>
                <li className="space-y-2">{t("96")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Google Analytics Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
          <h6 className="text-xl font-semibold">{t("116")}</h6>
          <div className="space-y-2">
            <p>{t("117")}</p>
            <p>{t("118")}</p>
            <p>{t("119")}</p>
            <p>
              {t("120")}{" "}
              <a
                href="https://www.google.de/maps"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.de/maps
              </a>
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="space-y-4 mt-8">
          {[129, 130, 131, 132].map((num) => (
            <p key={num} className="text-gray-300">
              {t(String(num))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
