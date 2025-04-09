# Google Advanced Protection: Ekstra sikkerhed til din konto

<!--
date: 2019-02-18
excerpt: Google Advanced Protection giver stærkere sikkerhed til risikokonti med fysiske nøgler, begrænset tredjepartsadgang og strengere gendannelse. Mere sikkert, men med begrænsninger.

-->

Efterhånden som vi lægger flere og flere data online, stiger vigtigheden af at holde disse data sikret imod uretmæssig adgang. Rigtig mange mennesker (mig selv inklusive) har en personlig Google-konto, og anvender denne til at gemme og behandle store mængder personlige data.

For de fleste brugere betyder det, at hvis bare ét enkelt kodeord kompromitteres, bliver der åbnet en ladeport til rigtig mange personlige data. Heldigvis har Google nogle af verdens førende sikkerhedseksperter ansat, men det hjælper ingenting, hvis brugeren har anvendt et svagt kodeord til sin Google-konto.

Heldigvis tilbyder Google deres sikkerhedsorienterede brugere mange forskellige muligheder for at sikre deres Google-konto, og jeg vil i det følgende skitsere de forskellige muligheder. Især vil jeg fremhæve en lidet kendt løsning kaldet Google Advanced Protection, som giver den stærkeste beskyttelse af ens Google-konto.

## De “nemme” løsninger

Til sikring af ens Google-konto forefindes et antal “lavthængende frugter”—lettilgængelige sikkerhedstiltag—der til sammen giver en rigtig god beskyttelse:

  - Anvend et unikt og langt kodeord, som er unikt for Google-kontoen. En god adgangskodeadministrator kan hjælpe til med at nå dette mål, omend disse programmer indebærer nogen kompleksitet i sig selv.
  - Slå totrinsbekræftelse til.
  - Hold altid softwaren på alle dine enheder opdateret.
  - Fjern adgangen til Google-kontoen for sjældent anvendte apps.
  - Anvend i det hele taget helt almindelig, sund fornuft for at undgå mistænkelige websider, anmodninger og mails.

Du kan selv læse flere af Googles egne råd til beskyttelse af din Google-konto på denne side.

## Den svære, sikreste løsning

Hvis man anvender alle ovenstående råd, er man nået langt i at beskytte sin Google-konto, og er sikkert mere modstandsdygtig overfor angreb end (langt) de fleste andre brugere.

Hvis man alligevel ønsker gå et skridt videre, selv om det vil ske på bekostning af noget funktionalitet, tilbyder Google alle brugere en ekstra pansring igennem deres [Google Advanced Protection Program](https://landing.google.com/advancedprotection/).

Google Advanced Protection giver først og fremmest tre ting udover den stærke beskyttelse, alle 
Google-konti i forvejen beskyttes med:

  - Stærkere beskyttelse imod phishing-angreb via fysiske adgangsnøgler.
  - Konto-adgang for tredjepartsprogrammer begrænset til Googles egne apps samt tredjeparter godkendt af Google.
  - Højere krav til identifikation ved forsøg på kontogendannelse.

Lad os kigge nærmere på dem enkeltvis og se, hvordan de hver især øger bolværket, der beskytter en Google-konto.

## Adgang via fysiske adgangsnøgler

Når Google Advanced Protection er slået til, er totrinsbekræftelse obligatorisk, og SMS eller Google Authenticator app’en på din smartphone kan ikke anvendes i tilgift til kodeordet. I stedet skal du anvende en fysisk sikkerhedsnøgle, som du kan læse om og købe via et link på denne side.

**Bemærk!** Kravet til en fysisk sikkerhedsnøgle også vil gælde dine mobile enheder som fx tablet og smartphone, hvorfor det er vigtigt, at du sikrer dig, at alle dine mobile enheder har NFC-understøttelse, da de ellers ikke vil kunne kommunikere med sikkerhedsnøglen.

Hvis du har en enhed, der ikke understøtter NFC, men har en USB-port, kan du måske få det til at virke via et USB OTG (*On The Go*)-kabel som kan købes hos fx AV-Cables, men det er ikke alle enheder, har understøttelse for OTP OTG.

På stationære enheder sættes sikkerhedsnøglen ganske simpelt ind i en ledig USB-port, og kræver ingen installation af driversoftware for at fungere, så du kan også anvende den på computere, hvor du ikke har administrator-adgang, fx på biblioteket.

Anvendelsen af en sikkerhedsnøgle, der anvender FIDO U2F (*Universal 2nd Factor*) sikrer imod phishing-angreb på to måder:

  1. Udvekslingen af kryptografiske nøgler mellem Google og sikkerhedsnøglen sammenholdt med den underliggende U2F-protokol (som du kan læse mere om her, og selve specifikationen findes her) sikrer, at hvis du prøver at logge ind på et falsk website, som udgiver sig for at være Google, vil det fejle. Under indrulleringen, som gøres én gang per website, hvor du ønsker at anvende din sikkerhedsnøgle, knyttes et unikt, kryptografisk nøglepar sammen mellem Google og sikkerhedsnøglen. (Præcis hvordan dette fungerer er for detaljeret til at komme ind på her, men kunne være interessant at dedikere indholdet af et særskilt indlæg til.)

  2. Fordi sikkerhedsnøglen kræver et fysisk input fra et menneske, kan et ondsindet website ikke automatisk "trække et nummer" fra sikkerhedsnøglen, uden du selv aktivt har godkendt det ved fx at sætte fingeren på sikkerhedsnøglen.

Det er selvfølgelig mere besværligt at skulle bære rundt på (og holde styr på) en separat sikkerhedsnøgle frem for at installere en app som Google Authenticator på sin smartphone, som man alligevel altid har med rundt, men det er prisen for den ekstra sikkerhed, man opnår.

## Begrænset kontoadgang for tredjepartsprogrammer

Via en Google-konto kan man give adgang til informationer indeholdt i kontoen, men denne adgang udgører en anselig sikkerhedsrisiko, hvorfor denne adgang lukkes ned for alle tredjepartsprogrammer undtagen Googles egne programmer som fx Gmail og Drive, samt visse tredjepartsprogrammer godkendt af Google.

Det betyder også, at man ikke kan sætte et mailprogram som fx Thunderbird eller Microsoft Outlook op til at forbinde til ens Gmail-konto, men udelukkende læse og besvare sin mail gennem Gmails webinterface i en browser. En enkelt undtagelse er i skrivende stund Apple Mail, som er et tredjepartsprogram, der er blevet godkendt af Google.

Man kan stadig anvende sin Google-konto til at logge ind på andre websites ved at klikke på “Log in with Google”, sådan som mange gør. Dog vil man blive bedt om en ekstra kode, hvis det website, man logger ind på, beder om adgang til Gmail eller Drive.

## Højere krav til identifikation ved kontogendannelse

Vi kender det alle sammen: vi glemmer nogle gange adgangskoden til en af vores mange online-konti, og Google-kontoen er ingen undtagelse. Til dette formål har Google en fastlagt procedure for kontogendannelse, sådan at den retmæssige ejermand eller -kvinde kan få adgang til sin konto igen, når det sker, ved at legitimere sig og bevise ejerskabet over kontoen på forskellige andre måder.

Når Google Advanced Protection er slået til for en Google-konto, vil kravene til denne procedure være væsentligt skærpet i forhold til almindelige Google-konti, og det vil således være væsentligt sværere at få adgang til sin konto, hvis man skulle gå hen og glemme sit kodeord. Dette er for at beskytte den rette ejermand mod at angribere uretmæssigt tiltusker sig adgang til ens konto, og er en anden del af prisen for en forbedret beskyttelse af ens Google-konto.

Præcis hvordan proceduren skærpes fortæller Google ikke noget om, men hvis man nogensinde har prøvet (for sjov eller for alvor) at komme igennem Googles almindelige procedure for kontogendannelse, ved man, at det er alt andet end trivielt at snyde sig ind denne vej, præcis som det retteligt bør være.

## Konklusion

Google Advanced Protection giver brugere den stærkeste beskyttelse, Google kan tilbyde i dag, og hvis man kan leve med begrænsningerne som følger med den øgede sikkerhed, gerne vil betale for to fysiske sikkerhedsnøgler (en backup er påkrævet, før man får lov til at slå Advanced Protection til), og alle ens mobile enheder har NFC-understøttelse, er der ingen grund til ikke at gøre det.
