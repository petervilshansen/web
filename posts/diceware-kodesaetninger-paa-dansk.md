<!--
	date: 2019-09-22
	excerpt: Diceware er en metode til at generere stærke kodesætninger ved hjælp af terninger og en ordliste. Metoden er nem at bruge og giver kodesætninger, der er nemmere at huske end traditionelle kodeord. Artiklen beskriver, hvordan man bruger Diceware-metoden med en dansk ordliste og et online terningkastværktøj.

-->

# Diceware på dansk: Nemme og sikre kodeord

Der findes kodeord, og så findes der kodesætninger. Et kodeord er typisk ét ord, nogle gange blandet med tal og specialtegn. Et eksempel på et kodeord kunne være g4$F=x,7&a%CJDsx. En kodesætning er flere ord, ofte uden tal og specialtegn, men med mellemrum til at adskille de enkelte ord. Et eksempel på en kodesætning kunne være Til en god bøf hører en god Chianti.

Korrekt konstrueret (og hvordan dettes gøres, kommer vi tilbage til nedenfor) vil en kodesætning være mindst lige så stærk som et tilsvarende kodeord, men væsentligt nemmere at huske end et kodeord af tilsvarende styrke. Netop denne forskel er det væsentligste argument for at anvende kodesætninger frem for kodeord i alle tilfælde, hvor det kan lade sig gøre og giver mening.

Der findes mange metodikker til fremstilling af stærke kodesætninger. Et grundlæggende krav til alle metodikker er, at de resulterer i en kodesætning med så høj entropi som muligt uden at kodesætningen bliver umulig at huske.

En relativt kendt metodik er kendt som [Diceware](http://world.std.com/~reinhold/diceware.html). Til at konstruere en kodesætning med Diceware, skal man bruge to ting:

	1. Fem terninger (dog kan man nøjes med en, men det er nemmere med fem)
	2. En Diceware-ordliste. Dette er en liste med ord, hvor der ud for hvert ord står et tal, der kan repræsenteres med terning-værdier. Så det første ord har nummer 11111, det næste har nummer 11112, …, 11116, 11121, 11122, …, 66666. I alt 65 = 7776 forskellige ord.

![Et udsnit af en Diceware-ordliste med danske ord.](img/diceware-udsnit.png)

Ideen er nu, at man slår et slag med sine fem terninger, aflæser øjnene, fx 1-4-2-5-4, og finder det tilsvarende ord i listen. Dette gør man et antal gange, helst fem eller flere, hvilket resulterer i den færdige kodesætning, eksempelvis bugner hustru aflyst nypris sektor.

Der findes mange steder på nettet, hvor man kan generere en Diceware-sætning på engelsk, men for nylig havde jeg brug for at lave en på dansk. Jeg kunne naturligvis have lavet en på engelsk og efterfølgende oversat den til dansk, men det ville have været mere besværligt, end hvis jeg havde en dansk Diceware-ordliste til at begynde med.

Efter nogen søgen på nettet, fandt jeg en dansk Diceware-ordliste. Jeg havde ikke lige fem terninger ved hånden, men heldigvis har random.org (som specialiserer sig i, ja endda sælger, ægte tilfældigt genererede bits via deres website) en terningkaster, der kan simulere kast med fem terninger.

![Terningkasteren på random.org har her kastet fem terninger.](img/diceware-random-org.png)

Terningkasteren på random.org har her kastet fem terninger. Dette kast med værdierne 1-5-6-1-3 vil resultere i ordet angå:

Ordet angå er nummer 15613 i den danske Diceware-ordliste.

![Random.org viser tre ord.](img/diceware-tre-ord.png)

Med ordlisten og terningkasteren fra random.org i hånden var det ingen sag at generere en Diceware-kodesætning på dansk i ét hug.

Du kan læse mere baggrundsinformation om Diceware fra manden, der opfandt metoden, lige her.

