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
            <div key={num} className="py-1 space-y-4">
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
            <ul className="list-disc list-inside space-y-4">
              {[23, 24, 25, 26, 27, 28].map((num) => (
                <li key={num} className="space-y-2">
                  <span className="font-bold">
                    {t(String(num)).split(":")[0].trim()}:{" "}
                  </span>
                  {t(String(num)).split(":")[1].trim()}
                </li>
              ))}
              <li>
                <span className="font-bold">{t("29")}:</span> {t("30")}
              </li>
              <li>
                <span className="font-bold">{t("31")}:</span> {t("32")}
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
              <li className="space-y-2">
                {t("43").includes(":") ? (
                  <>
                    <span className="font-bold">
                      {t("43").split(":")[0].trim()}
                    </span>
                    {": "}
                    {t("43").split(":")[1].trim()}
                  </>
                ) : (
                  t("43")
                )}
              </li>
              <li className="space-y-2">
                <span className="font-bold">
                  {t("44").split(":")[0].trim()}:{" "}
                </span>
                {t("44").split(":")[1].trim()}
              </li>
            </ul>
          </div>
          <div className="py-3 space-y-4">
            <p>{t("45")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">
                  {t("46").includes(":") ? (
                    <>
                      <span className="font-bold">
                        {t("46").split(":")[0].trim()}
                      </span>
                      {": "}
                      {t("46").split(":")[1].trim()}
                    </>
                  ) : (
                    t("46")
                  )}
                </li>
                <li className="space-y-2">
                  {t("47").includes(":") ? (
                    <>
                      <span className="font-bold">
                        {t("47").split(":")[0].trim()}
                      </span>
                      {": "}
                      {t("47").split(":")[1].trim()}
                    </>
                  ) : (
                    t("47")
                  )}
                </li>
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
                <li key={num} className="space-y-2">
                  {t(String(num))}
                </li>
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
                <span className="font-bold">{t("76")}</span>{" "}
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
                <span className="font-bold">
                  {t("77").split(":")[0].trim()}:{" "}
                </span>
                {t("77").split(":")[1].trim()}
              </li>
              <li>
                <span className="font-bold">{t("78")} </span>
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
          {[97, 98, 99].map((num) => (
            <div key={num} className="py-1 space-y-4">
              {t(String(num)).includes(":") ? (
                <>
                  <p>{t(String(num)).split(":")[0].trim()}:</p>
                  <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <ul className="space-y-4 list-disc list-inside">
                      <li className="space-y-2">
                        {t(String(num)).split(":")[1].trim()}
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                  <ul className="space-y-4 list-disc list-inside">
                    <li className="space-y-2">{t(String(num))}</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div className="py-1 space-y-4">
            <p>{t("100")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">
                  <span className="font-bold">
                    {t("101").split(":")[0].trim()}:{" "}
                  </span>
                  {t("101").split(":")[1].trim()}
                </li>
                <li className="space-y-2">
                  <span className="font-bold">
                    {t("102").split(":")[0].trim()}:{" "}
                  </span>
                  {t("102").split(":")[1].trim()}
                </li>
                <li className="space-y-2">
                  <span className="font-bold">{t("103")}</span>{" "}
                  <a
                    href="https://marketingplatform.google.com/intl/de/about/analytics/"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    marketingplatform.google.com/intl/de/about/analytics/
                  </a>
                </li>
                <li className="space-y-2">
                  <span className="font-bold">{t("104")}</span>{" "}
                  <a
                    href="https://policies.google.com/privacy?hl=de"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/privacy?hl=de
                  </a>
                </li>
                <li className="space-y-2">
                  <span className="font-bold">
                    {t("105").split(":")[0].trim()}:{" "}
                  </span>
                  {t("105").split(":")[1].trim()}
                </li>
                <li className="space-y-2">
                  <span className="font-bold">{t("106")}</span>{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout?hl=de"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tools.google.com/dlpage/gaoptout?hl=de
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("107")}</h3>
          <p>{t("108")}</p>

          <div className="py-1 space-y-4">
            <p>{t("109")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li className="space-y-2">{t("110")}</li>
                <li className="space-y-2">{t("111")}</li>
              </ul>
            </div>
          </div>

          {[112, 113, 114].map((num) => (
            <div key={num} className="py-1 space-y-4">
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

          <div className="py-1 space-y-4">
            <p>{t("115")}</p>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <h6 className="text-xl font-semibold">{t("116")}</h6>
              <div className="space-y-2">
                <p>{t("117")}</p>
                <ul className="space-y-4 list-disc list-inside">
                  <li className="space-y-2">
                    <span className="font-bold">
                      {t("118").split(":")[0].trim()}:{" "}
                    </span>
                    {t("118").split(":")[1].trim()}
                  </li>
                  <li className="space-y-2">
                    <span className="font-bold">
                      {t("119").split(":")[0].trim()}:{" "}
                    </span>
                    {t("119").split(":")[1].trim()}
                  </li>
                  <li>
                    <span className="font-bold">{t("120")}</span>{" "}
                    <a
                      href="https://www.google.de/maps"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.google.de/maps
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">{t("121")}</span>{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policies.google.com/privacy
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">{t("122")}</span>{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout?hl=de"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      tools.google.com/dlpage/gaoptout?hl=de
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
              <h6 className="text-xl font-semibold">{t("123")}</h6>
              <div className="space-y-2">
                <p>{t("124")}</p>
                <ul className="space-y-4 list-disc list-inside">
                  <li className="space-y-2">
                    <span className="font-bold">
                      {t("125").split(":")[0].trim()}:{" "}
                    </span>
                    {t("125").split(":")[1].trim()}
                  </li>
                  <li className="space-y-2">
                    <span className="font-bold">
                      {t("126").split(":")[0].trim()}:{" "}
                    </span>
                    {t("126").split(":")[1].trim()}
                  </li>
                  <li>
                    <span className="font-bold">{t("127")}</span>{" "}
                    <a
                      href="https://fonts.google.com/"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      fonts.google.com/
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">{t("128")}</span>{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policies.google.com/privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("129")}</h3>
          <p>{t("130")}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("131")}</h3>
          <p>{t("132")}</p>
        </div>
      </div>
    </div>
  );
}
