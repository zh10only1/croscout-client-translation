"use server";
import Main from "@/app/[lng]/Main";
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
      <h5>Datenschutzbestimmungen</h5>
      <p>
        Mit dieser Datenschutzerklärung möchten wir Sie über Art, Umfang und
        Zweck der Verarbeitung von personenbezogenen Daten (im Folgenden auch
        nur als „Daten“ bezeichnet) aufklären. Personenbezogene Daten sind alle
        Daten, die einen persönlichen Bezug zu Ihnen aufweisen, z. B. Name,
        Adresse, E-Mail-Adresse oder Ihr Nutzerverhalten. Die
        Datenschutzerklärung gilt für alle von uns vorgenommene
        Daten-Verarbeitungsvorgänge sowohl im Rahmen unserer Kerntätigkeit als
        auch für die von uns vorgehaltenen Online-Medien.
      </p>
      <p>Wer bei uns für die Datenverarbeitung verantwortlich ist</p>
      <p>
        Verantwortlich für die Datenverarbeitung ist:
        <br />
        Einzelunternehmung- brandoz.eu
        <br />
        Jörg Allmannsberger
        <br />
        Südtsr. 116 53175 Bonn
        <br />
        Deutschland
        <br />
        Telefon: +49 228 61967990
        <br />
        Mail: <a href="mailto:office@croscout.eu">office@croscout.eu</a>
      </p>
      <p>
        Verarbeitung Ihrer Daten im Rahmen der Kerntätigkeit unseres
        Unternehmens
      </p>
      <p>
        Sofern Sie unser User sind, richtet sich Art, Umfang und Zweck der
        Verarbeitung Ihrer Daten nach dem zwischen uns bestehenden vertraglichen
        bzw. vorvertraglichen Beziehungen. In diesem Sinne gehören zu den von
        uns verarbeiteten Daten all diejenigen Daten, die zum Zwecke der
        Inanspruchnahme der vertraglichen bzw. vorvertraglichen Leistungen durch
        Sie bereitgestellt werden bzw. wurden und die zur Abwicklung Ihrer
        Anfrage oder des zwischen uns geschlossenen Vertrages benötigt werden.
        Sofern sich aus den weiteren Hinweisen dieser Datenschutzerklärung
        nichts anderes ergibt, beschränkt sich die Verarbeitung Ihrer Daten
        sowie deren Weitergabe an Dritte auf diejenigen Daten, die zur
        Beantwortung Ihrer Anfragen und/oder zur Erfüllung des zwischen Ihnen
        und uns geschlossenen Vertrages, zur Wahrung unserer Rechte sowie zur
        Erfüllung gesetzlicher Pflichten erforderlich und zweckmäßig sind.
        Welche Daten hierfür erforderlich sind, teilen wir Ihnen vor oder im
        Rahmen der Datenerhebung mit. Soweit wir zur Erbringung unserer
        Leistungen Drittanbieter einsetzen, gelten die Datenschutzhinweise der
        jeweiligen Drittanbieter.
      </p>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Bestandsdaten (bspw. Namen, Adressen)</li>
        <li>Zahlungsdaten (bspw. Bankverbindungsdaten, Rechnungen)</li>
        <li>
          Kontakdaten (bspw. E-Mail-Adresse, Telefonnummer, Postanschrift)
        </li>
        <li>Vertragsdaten (bspw. Vertragsgegenstand, Vertragsdauer)</li>
      </ul>
      <p>
        Betroffene Personen: Kunden, Interessenten, Geschäfts- und
        Vertragspartner
      </p>
      <p>
        Verarbeitungszweck: Abwicklung vertraglicher Leistungen, Kommunikation
        sowie Beantwortung von Kontaktanfragen, Büro und Organisationsverfahren
      </p>
      <p>
        Rechtsgrundlage: Vertragserfüllung und vorvertragliche Anfragen, Art. 6
        Abs. 1 lit. b DSGVO, rechtliche Verpflichtung, Art. 6 Abs. 1 lit. c
        DSGVO, berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
      </p>
      <p>Ihre Rechte nach der DSGVO</p>
      <p>
        Nach der DSGVO stehen Ihnen die nachfolgend aufgeführten Rechte zu, die
        Sie jederzeit bei dem in Ziffer 1. dieser Datenschutzerklärung genannten
        Verantwortlichen geltend machen können:
      </p>
      <ul>
        <li>
          Recht auf Auskunft: Sie haben das Recht, von uns Auskunft darüber zu
          verlangen, ob und welche Daten wir von Ihnen verarbeiten.
        </li>
        <li>
          Recht auf Berichtigung: Sie haben das Recht, die Berichtigung
          unrichtiger oder Vervollständigung unvollständiger Daten zu verlangen.
        </li>
        <li>
          Recht auf Löschung: Sie haben das Recht, die Löschung Ihrer Daten zu
          verlangen.
        </li>
        <li>
          Recht auf Einschränkung: Sie haben in bestimmten Fällen das Recht zu
          verlangen, dass wir Ihre Daten nur noch eingeschränkt bearbeiten.
        </li>
        <li>
          Recht auf Daten Übertragbarkeit: Sie haben das Recht zu verlangen,
          dass wir Ihnen oder einem anderen Verantwortlichen Ihre Daten in einem
          strukturierten, gängigen und maschinenlesebaren Format übermitteln.
        </li>
        <li>
          Beschwerderecht: Sie haben das Recht, sich bei einer Aufsichtsbehörde
          zu beschweren. Zuständig ist die Aufsichtsbehörde Ihres üblichen
          Aufenthaltsorts, Ihres Arbeitsplatzes oder unseres Firmensitzes.
        </li>
      </ul>
      <p>Widerrufsrecht</p>
      <p>
        Sie haben das Recht, die von Ihnen erteilte Einwilligung zur
        Datenverarbeitung jederzeit zu widerrufen.
      </p>
      <p>Widerspruchsrecht</p>
      <p>
        Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer Daten, die
        wir auf unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO
        stützen, Widerspruch einzulegen. Sofern Sie von Ihrem Widerspruchsrecht
        Gebrauch machen, bitten wir Sie um die Darlegung der Gründe. Wir werden
        Ihre personenbezogenen Daten dann nicht mehr verarbeiten, es sei denn,
        wir können Ihnen gegenüber nachweisen, dass zwingende schutzwürdige
        Gründe an der Datenverarbeitung Ihre Interessen und Rechte überwiegen.
        Unabhängig vom vorstehend Gesagten, haben Sie das jederzeitige Recht,
        der Verarbeitung Ihrer personenbezogenen Daten für
      </p>
      <p>Wann löschen wir Ihre Daten ?</p>
      <p>
        Wir löschen Ihre Daten dann, wenn wir diese nicht mehr brauchen oder Sie
        uns dies vorgeben. Das bedeutet, dass – sofern sich aus den einzelnen
        Datenschutzhinweisen dieser Datenschutzerklärung nichts anderes ergibt –
        wir Ihre Daten löschen,
      </p>
      <ul>
        <li>
          wenn der Zweck der Datenverarbeitung weggefallen ist und damit die
          jeweilige in den einzelnen Datenschutzhinweisen genannte
          Rechtsgrundlage nicht mehr besteht, also bspw.
          <ul>
            <li>
              nach Beendigung der zwischen uns bestehenden vertraglichen oder
              mitgliedschaftlichen Beziehungen (Art. 6 Abs. 1 lit. a DSGVO) oder
            </li>
            <li>
              nach Wegfall unseres berechtigten Interesses an der weiteren
              Verarbeitung oder Speicherung Ihrer Daten (Art. 6 Abs. 1 lit. f
              DSGVO),
            </li>
            <li>
              wenn Sie von Ihrem Widerrufsrecht Gebrauch machen und keine
              anderweitige gesetzliche Rechtsgrundlage für die Verarbeitung im
              Sinne von Art. 6 Abs. 1 lit. b-f DSGVO eingreift,
            </li>
            <li>
              wenn Sie von Ihrem Widerspruchsrecht Gebrauch machen und der
              Löschung keine zwingenden schutzwürdigen Gründe entgegenstehen.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Sofern wir (bestimmte Teile) Ihre(r) Daten jedoch noch für andere Zwecke
        vorhalten müssen, weil dies etwa steuerliche Aufbewahrungsfristen (in
        der Regel 6 Jahre für Geschäftskorrespondenz bzw. 10 Jahre für
        Buchungsbelege) oder die Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen aus vertraglichen Beziehungen (bis zu vier Jahren)
        erforderlich machen oder die Daten zum Schutz der Rechte einer anderen
        natürlichen oder juristischen Person gebraucht werden, löschen wir (den
        Teil) Ihre(r) Daten erst nach Ablauf dieser Fristen. Bis zum Ablauf
        dieser Fristen beschränken wir die Verarbeitung dieser Daten jedoch auf
        diese Zwecke (Erfüllung der Aufbewahrungspflichten).
      </p>
      <p>Cookies</p>
      <p>
        Unsere Internetseite nutzt Cookies. Bei Cookies handelt es sich um
        kleine Textdateien, bestehend aus einer Reihe von Zahlen und Buchstaben,
        die auf dem von Ihnen genutzten Endgerät abgelegt und gespeichert
        werden. Cookies dienen vorrangig dazu, Informationen zwischen dem von
        Ihnen genutzten Endgerät und unserer Webseite auszutauschen. Hierzu
        gehören u. a. die Spracheinstellungen auf einer Webseite, der
        Login-Status oder die Stelle, an der ein Video geschaut wurde. Beim
        Besuch unserer Webseiten werden zwei Typen von Cookies eingesetzt:
      </p>
      <ul>
        <li>
          Temporäre Cookies (Session Cookies): Diese speichern eine sogenannte
          Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der
          gemeinsamen Sitzung zuordnen lassen. Die Session-Cookies werden
          gelöscht, wenn Sie sich ausloggen oder Ihren Browser schließen.
        </li>
        <li>
          Permanente Cookies: Permanente Cookies bleiben auch nach dem Schließen
          des Browsers gespeichert. Dadurch erkennt unsere Webseite Ihren
          Rechner wieder, wenn Sie auf unsere Webseite zurückkehren. In diesen
          Cookies werden beispielsweise Informationen zu Spracheinstellungen
          oder Log-In-Informationen gespeichert. Außerdem kann mit diesen
          Cookies Ihr Surfverhalten dokumentiert und gespeichert werden. Diese
          Daten können zu Statistik-, Marketing- und Personalisierungs-Zwecken
          verwendet werden.
        </li>
      </ul>
      <p>
        Neben der vorstehenden Einteilung können Cookies auch im Hinblick auf
        ihren Einsatzzweck unterschieden werden:
      </p>
      <ul>
        <li>
          Notwendige Cookies: Dies sind Cookies, die für den Betrieb unserer
          Webseite unbedingt erforderlich sind, um Logins oder Warenkörbe für
          die Dauer Ihrer Sitzung zu speichern oder Cookies, die aus
          Sicherheitsgründen gesetzt werden.
        </li>
        <li>
          Statistik-, Marketing- und Personalisierungs-Cookies: Dies sind
          Cookies, die für Analysezwecke oder die Reichweitenmessung eingesetzt
          werden. Über solche „Tracking“-Cookies können insbesondere
          Informationen zu eingegebenen Suchbegriffen oder die Häufigkeit von
          Seitenaufrufen gespeichert sein. Daneben kann aber auch das
          Surfverhalten eines einzelnen Nutzers (z. B. Betrachten bestimmter
          Inhalte, Nutzen von Funktionen etc.) in einem Nutzerprofil gespeichert
          werden. Solche Profile werden genutzt, um Nutzern Inhalte anzuzeigen,
          die deren potentiellen Interessen entsprechen. Soweit wir Dienste
          nutzen, über die Cookies zu Statistik-, Marketing- und
          Personalisierungs-Zwecken auf Ihrem Endgerät gespeichert werden,
          informieren wir Sie hierzu gesondert in den nachfolgenden Abschnitten
          unserer Datenschutzerklärung oder im Rahmen der Einholung Ihrer
          Einwilligung.
        </li>
      </ul>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
        <li>
          Kommunikationsdaten (bspw. Informationen über das genutzte Gerät,
          IP-Adresse).
        </li>
      </ul>
      <p>Betroffene Personen: Nutzer unserer Onlineangebote</p>
      <p>
        Verarbeitungszweck: Ausspielen unserer Internetseiten, Gewährleistung
        des Betriebs unserer Internetseiten, Verbesserung unseres
        Internetangebotes, Kommunikation und Marketing
      </p>
      <p>
        Rechtsgrundlage: Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
        Sofern wir von Ihnen keine Einwilligung in das Setzen der Cookies
        einholen, stützen wir die Verarbeitung Ihrer Daten auf unser
        berechtigtes Interesse, die Qualität und Benutzerfreundlichkeit unseres
        Internetauftritts, insbesondere der Inhalte und Funktionen zu
        verbessern. Sie haben über die Sicherheitseinstellungen Ihres Browsers,
        dem Einsatz der von uns im Rahmen unseres berechtigten Interesses
        gesetzten Cookies zu widersprechen. Dort haben Sie die Möglichkeit
        festzulegen, ob Sie etwa von vornherein keine oder nur auf Nachfrage
        Cookies akzeptieren oder aber festlegen, dass Cookies nach jedem
        Schließen Ihres Browsers gelöscht werden. Werden Cookies für unsere
        Webseite deaktiviert, können möglicherweise nicht mehr alle Funktionen
        der Webseite vollumfänglich genutzt werden.
      </p>
      <p>Einwilligung, Art. 6 Abs. 1 lit. a DSGVO</p>
      <p>
        Sofern wir Sie vor Ihrem Besuch unserer Internetpräsenz darum bitten,
        bestimmte Cookies auf Ihr Endgerät setzen zu dürfen, und Sie hierin
        einwilligen, ist in der von Ihnen erteilten Einwilligung die
        Rechtsgrundlage zu sehen. Wir informieren Sie im Rahmen der Einwilligung
        darüber, welche Cookies wir im Einzelnen setzen. Sofern Sie diese
        Einwilligung nicht erteilen, setzen sich lediglich die sogenannten
        technisch notwendigen Cookies, die für den ordnungsgemäßen Betrieb
        unserer Internetseiten sowie deren Darstellung in Ihrem Browser
        erforderlich sind. Sofern Sie in das Setzen von Cookies eingewilligt
        haben, haben die jederzeitige Möglichkeit, uns gegenüber der erteilten
        Einwilligung zu widerrufen.
      </p>
      <p>Webhosting</p>
      <p>
        Wir bedienen uns zum Vorhalten unserer Internetseiten eines Anbieters,
        auf dessen Server unsere Internetseiten gespeichert und für den Abruf im
        Internet verfügbar gemacht werden (Hosting). Hierbei können von dem
        Anbieter all diejenigen über den von Ihnen genutzten Browser
        übertragenen Daten verarbeitet werden, die bei der Nutzung unserer
        Internetseiten anfallen. Hierzu gehören insbesondere Ihre IP-Adresse,
        die der Anbieter benötigt, um unser Online-Angebot an den von Ihnen
        genutzten Browser ausliefern zu können sowie sämtliche von Ihnen über
        unsere Internetseite getätigten Eingaben. Daneben kann der von uns
        genutzte Anbieter
        <ul>
          <li>
            das Datum und die Uhrzeit des Zugriffs auf unsere Internetseite
          </li>
          <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
          <li>Zugriffsstatus (HTTP-Status)</li>
          <li>die übertragene Datenmenge</li>
          <li>der Internet-Service-Provider des zugreifenden Systems</li>
          <li>der von Ihnen verwendete Browsertyp und dessen Version</li>
          <li>das von Ihnen verwendete Betriebssystem</li>
          <li>
            die Internetseite, von welcher Sie gegebenenfalls auf unsere
            Internetseite gelangt sind
          </li>
          <li>
            die Seiten bzw. Unterseiten, welche Sie auf unserer Internetseite
            besuchen.
          </li>
        </ul>
      </p>
      <p>
        erheben. Die vorgenannten Daten werden als Logfiles auf den Servern
        unseres Anbieters gespeichert. Dies ist erforderlich, um die Stabilität
        und Sicherheit des Betriebs unserer Internetseite zu gewährleisten.
      </p>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
        <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
        <li>
          Kommunikationsdaten (bspw. Informationen über das genutzte Gerät,
          IP-Adresse)
        </li>
      </ul>
      <p>Betroffene Personen: Nutzer unserer Internetpräsenz</p>
      <p>
        Verarbeitungszweck: Ausspielen unserer Internetseiten, Gewährleistung
        des Betriebs unserer Internetseiten
      </p>
      <p>Rechtsgrundlage: Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO</p>
      <p>Von uns beauftragte(r) Webhoster:</p>
      <ul>
        <li>
          Dienstanbieter:{" "}
          <a href="https://www.hivelocity.net/">hivelocity.net</a>
        </li>
        <li>
          Adresse: 8010 Woodland Center Blvd, Suite 700 Tampa, FL 33614 USA
        </li>
        <li>
          Datenschutzerklärung:{" "}
          <a href="https://www.hivelocity.net/legal/">
            https://www.hivelocity.net/legal/
          </a>
        </li>
      </ul>
      <p>Kontaktaufnahme</p>
      <p>croscout.eu:</p>
      <p>
        Soweit Sie uns über E-Mail, Soziale Medien, Telefon, Fax, Post, unser
        Kontaktformular oder sonstwie ansprechen und uns hierbei
        personenbezogene Daten wie Ihren Namen, Ihre Telefonnummer oder Ihre
        E-Mail-Adresse zur Verfügung stellen oder weitere Angaben zur Ihrer
        Person oder Ihrem Anliegen machen, verarbeiten wir diese Daten zur
        Beantwortung Ihrer Anfrage im Rahmen des zwischen uns bestehenden
        vorvertraglichen oder vertraglichen Beziehungen.
      </p>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Bestandsdaten (bspw. Namen, Adressen)</li>
        <li>
          Kontaktdaten (bspw. E-Mail-Adresse, Telefonnummer, Postanschrift)
        </li>
        <li>Inhaltsdaten (Texte, Fotos, Videos)</li>
        <li>Vertragsdaten (bspw. Vertragsgegenstand, Vertragsdauer)</li>
      </ul>
      <p>
        Betroffene Personen: Interessenten, Kunden, Geschäfts- und
        Vertragspartner
      </p>
      <p>
        Verarbeitungszweck: Kommunikation sowie Beantwortung von
        Kontaktanfragen, Büro und Organisationsverfahren
      </p>
      <p>
        Rechtsgrundlage: Vertragserfüllung und vorvertragliche Anfragen, Art. 6
        Abs. 1 lit. b DSGVO, berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
      </p>
      <p>Private Anbieter:</p>
      <p>
        Falls Sie als User mit einem privaten Anbieter über sein Profil auf
        croscout.eu in Kontakt treten sollten, so erhält der jeweilige private
        Anbieter Ihre im Rahmen der Kontaktaufnahme eingetragenen persönlichen
        Daten. Der private Anbieter ist aber verpflichtet, diese persönlichen
        Daten nicht an Dritte weiterzuleiten, sich an die gesetzlichen
        Bestimmungen nach der DSGVO zu halten und diese ausschließlich zum
        Zwecke der Bearbeitung des jeweiligen Anliegens verarbeiten zu dürfen.
      </p>
      <p>Webanalyse und Statistik</p>
      <p>
        Um die Besucherströme auf unserer Internetpräsenz zu erfassen und
        statistisch auszuwerten, setzen wir Webanalyse-Dienste ein. Solche
        Dienste erfassen unter anderem Daten darüber, von welcher Internetseite
        Sie auf unsere Internetpräsenz gelangt sind (sogenannte Referrer), auf
        welche Seiten unserer Internetpräsenz Sie zugegriffen haben, wie lange
        Sie unsere Seiten besucht und welche Interaktionen Sie dort vorgenommen
        haben. Daneben werden Daten zu dem von Ihnen verwendeten Browser,
        Computersystem sowie der Geräteart erhoben. Außerdem können über einen
        solchen Dienst auch demographische Informationen, wie bspw. das Alter
        oder das Geschlecht als pseudonyme Werte erfasst werden. Sofern Sie in
        die Erhebung Ihrer Standortdaten eingewilligt haben, können, je nach
        Anbieter, auch diese verarbeitet werden. Um diese Daten zu erfassen und
        zu sichern, setzt der von uns verwendete Webanalyse-Dienst in der Regel
        einen Cookie auf das von Ihnen genutzte Endgerät, mit dem auch die Ihnen
        zugeordnete IP-Adresse erhoben wird. Allerdings wird diese über ein
        sogenanntes IP-Masking-Verfahren gekürzt, so dass die IP-Adresse nicht
        mehr Ihrem Besuch auf unserer Internetseite zugeordnet werden kann. Auch
        im Übrigen werden keine Klardaten wie Namen oder E-Mail-Adressen
        gespeichert. Weder wir noch der von uns eingesetzte Dienst kennt die
        Identität der Besucher unserer Internetseiten. Wir möchten Sie darauf
        hinweisen, dass je nach Sitzland des unten genannten Diensteanbieters
        die über den Dienst erfassten Daten außerhalb des Raumes der
        Europäischen Union übertragen und verarbeitet werden können. Es besteht
        in diesem Fall das Risiko, dass das von der DSGVO vorgeschriebene
        Datenschutzniveau nicht eingehalten und die Durchsetzung Ihrer Rechte
        nicht oder nur erschwert erfolgen kann.
      </p>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
        <li>
          Kommunikationsdaten (bspw. Informationen über das genutzte Gerät,
          IP-Adresse).
        </li>
      </ul>
      <p>Betroffene Personen: Nutzer unserer Onlineangebote</p>
      <p>
        Verarbeitung Zweck: Reichweitenmessung, Erfolgskontrolle von Kampagnen,
        Remarketing sowie interessen- und verhaltensbedingtes Marketing
      </p>
      <p>
        Rechtsgrundlage: Sofern wir Sie vor dem Einsatz des jeweiligen Dienstes
        um Ihre Einwilligung gebeten haben, liegt hierin die Rechtsgrundlage,
        Art. 6 Abs. 1 lit. a DSGVO. Im Übrigen setzen wir den jeweiligen Dienst
        auf Grund unseres berechtigten Interesse ein, die Besucherströme unserer
        Internetseiten analysieren, um hierüber die Funktionen, Angebote sowie
        das Nutzungserlebnis fortlaufend verbessern zu können, Art. 6 Abs. 1
        lit. f DSGVO.
      </p>
      <p>Wir nutzen folgende Webanalyse-Dienste:</p>
      <ul>
        <li>
          Diensteanbieter: Google Inc., 1600 Amphitheatre Parkway, Mountain
          View, CA 94043, USA
        </li>
        <li>
          Sitz innerhalb der EU: Google Dublin, Google Ireland Ltd., Gordon
          House, Barrow Street, Dublin 4, Ireland
        </li>
        <li>
          Internetseite:{" "}
          <a href="https://marketingplatform.google.com/intl/de/about/analytics/">
            https://marketingplatform.google.com/intl/de/about/analytics/
          </a>
        </li>
        <li>
          Datenschutzerklärung:{" "}
          <a href="https://policies.google.com/privacy?hl=de">
            https://policies.google.com/privacy?hl=de
          </a>
        </li>
        <li>
          Opt-Out-Möglichkeit: Wenn Sie nicht möchten, dass Ihre Daten von
          Google Analytics verwendet werden, können Sie ein sog. Opt-Out Plugin
          setzen, welches zukünftig verhindert, dass Daten von Ihnen auf unserer
          Webseite erfasst werden.
        </li>
        <li>
          Dieses Plugin erhalten Sie hier:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
            https://tools.google.com/dlpage/gaoptout?hl=de
          </a>
        </li>
      </ul>
      <p>Content-Dienste</p>
      <p>
        Wir nutzen bestimmte Dienste, um über unsere Internetpräsenz bestimmte
        Inhalte oder Grafiken (Videos, Bilder, Musik, Schriftarten,
        Kartenmaterial) ausspielen zu können. Dabei verarbeiten die von uns
        eingesetzten Dienste die Ihnen zum Zeitpunkt Ihres Besuchs auf unseren
        Internetseiten zugeordnete IP-Adresse, da nur so der jeweilige Inhalt in
        dem von Ihnen verwendeten Browser dargestellt werden kann. Darüber
        hinaus können die Anbieter dieser Dienste weitere Cookies auf Ihr
        Endgerät setzen, über die Informationen über Ihr Nutzungsverhalten, Ihre
        Interessen, das von Ihnen verwendete Gerät und den verwendeten Browser
        sowie Zeitpunkt und Dauer Ihrer Sitzung erhoben werden. Diese Daten
        verwenden die Anbieter regelmäßig für Analyse-, Statistik- und
        Marketingzwecke. Zudem können diese Informationen können auch mit
        Informationen aus anderen Quellen verbunden werden. Dies gilt
        insbesondere dann, wenn Sie selbst einen Account bei dem Diensteanbieter
        unterhalten und zum Zeitpunkt der Sitzung dort eingeloggt sind. Wir
        weisen darauf hin, dass je nach Sitzland des nachstehend genannten
        Diensteanbieters die nachfolgend näher benannten Daten auf Server
        außerhalb des Raumes der Europäischen Union übertragen und verarbeitet
        werden können. Es besteht in diesem Fall das Risiko, dass das von der
        DSGVO vorgeschriebene Datenschutzniveau nicht eingehalten und die
        Durchsetzung Ihrer Rechte nicht oder nur erschwert erfolgen kann.
      </p>
      <p>Betroffene Daten:</p>
      <ul>
        <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
        <li>
          Kommunikationsdaten (bspw. Informationen über das genutzte Gerät,
          IP-Adresse)
        </li>
      </ul>
      <p>Betroffene Personen: Nutzer unserer Internetpräsenz</p>
      <p>
        Verarbeitung Zweck: Ausspielen unserer Internetseiten, Anbieten von
        Inhalten, Gewährleistung des Betriebs unserer Internetseiten
      </p>
      <p>
        Rechtsgrundlage: Einwilligung über Cookie-Consent-Banner, Art. 6 Abs. 1
        lit. a DSGVO, berechtigte Interessen, Art. 6 Abs. 1 lit. f DSGVO
      </p>
      <p>Wir nutzen folgende Content-Dienste:</p>
      <ul>
        <li>
          <strong>Google Maps</strong>
          <p>
            Wir nutzen auf unserer Internetpräsenz Google Maps. Hierbei wird
            durch Google die IP-Adresse des Besuchers erhoben und verarbeitet.
            Wenn Sie eine Internetseite besuchen, auf der Google Maps
            eingebunden ist, wird unabhängig davon, ob die Nutzung von Google
            Maps tatsächlich erfolgt oder Sie in Ihrem Google Account eingeloggt
            sind Ihre IP-Adresse sowie Ihre Standortdaten (letztere in der Regel
            nicht ohne Ihre Einwilligung) an Google übermittelt. Ihre IP-Adresse
            wird Ihrem Google Account zugeordnet, sofern Sie bei dem Besuch
            unserer Internetpräsenz dort eingeloggt sind.
          </p>
          <p>
            Diensteanbieter: Google Inc., 1600 Amphitheatre Parkway, Mountain
            View, CA 94043, USA
          </p>
          <p>
            Sitz in der EU: Google Ireland Limited, Gordon House, Barrow Street,
            Dublin 4, Irland
          </p>
          <p>
            Internetseite:{" "}
            <a href="https://www.google.de/maps">https://www.google.de/maps</a>
          </p>
          <p>
            Datenschutzerklärung:{" "}
            <a href="https://policies.google.com/privacy">
              https://policies.google.com/privacy
            </a>
          </p>
          <p>
            Opt-Out-Möglichkeit:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
              https://tools.google.com/dlpage/gaoptout?hl=de
            </a>
          </p>
        </li>
      </ul>
      <p>Google Web Fonts</p>
      <p>
        Mit Google Web Fonts können wir Schriftarten (Web Fonts) in das Design
        unserer Webseite einbinden und diese bei der Darstellung unserer
        Internetseiten in Ihrem Browser korrekt ausgeben. Die Einbindung dieser
        Web Fonts erfolgt durch einen Serveraufruf bei Google. Von dort aus
        werden die Schriftarten komprimiert an Ihren Browser weitergegeben und
        dort entpackt. Regelmäßig befindet sich dieser Server in den USA.
        Besuchen Sie eine unserer Seiten auf denen wir Google Fonts einbinden,
        wird an Google übermittelt, welche unserer Internetseiten Sie besucht
        haben.
      </p>
      <p>
        Diensteanbieter: Google Inc., 1600 Amphitheatre Parkway, Mountain View,
        CA 94043, USA
      </p>
      <p>
        Sitz in der EU: Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irland
      </p>
      <p>
        Internetseite:{" "}
        <a href="https://fonts.google.com/">https://fonts.google.com/</a>
      </p>
      <p>
        Datenschutzerklärung:{" "}
        <a href="https://policies.google.com/privacy">
          https://policies.google.com/privacy
        </a>
      </p>

      <p>Sicherheitsmaßnahmen</p>
      <p>
        Wir treffen im Übrigen technische und organisatorische
        Sicherheitsmaßnahmen nach dem Stand der Technik, um die Vorschriften der
        Datenschutzgesetze einzuhalten und Ihre Daten gegen zufällige oder
        vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust,
        Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
      </p>

      <p>Aktualität und Änderung dieser Datenschutzerklärung</p>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April
        2024. Aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann
        es notwendig werden, diese Datenschutzerklärung anzupassen. Diese
        Datenschutzerklärung wurde mit Hilfe des Datenschutz-Generators von SOS
        Recht erstellt. SOS Recht ist ein Angebot der Mueller.legal
        Rechtsanwälte Partnerschaft mit Sitz in Berlin.
      </p>
    </div>
  );
}
