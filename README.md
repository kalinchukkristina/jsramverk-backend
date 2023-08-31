# Jsramverket-Backend

Välkommen till Gruppen! Detta projekt använder olika npm-paket för att driva applikationen. För att säkerställa att projektet är säkert har vi genomfört en  säkerhetsgranskning med hjälp av `npm audit`. Nedan hittar du en lista över de identifierade sårbarheterna och de åtgärder som har vidtagits för att lösa dem.

<details> 
 <summary><code>1. Beskriv i README.md vilka säkerhetshål ni hittade och hur ni åtgärdade de.</code></summary>

## Identifierade sårbarheter

### 1. Debug (Hög allvarlighet)
- **Sårbarhet:** Ineffektiv komplexitet i reguljära uttryck (CVE-XXXX-XXXX)
- **Beskrivning:** Debug-paketet lider av en sårbarhet som rör ineffektivitet i reguljära uttryck, vilket kan leda till en form av "Regular Expression Denial of Service".
- **Åtgärd:** Debug har uppgraderats till en säker version.

### 2. Fresh (Hög allvarlighet)
- **Sårbarhet:** Regular Expression Denial of Service i Fresh (CVE-XXXX-XXXX)
- **Beskrivning:** Fresh-paketet lider av en sårbarhet kopplad till reguljära uttryck, som potentiellt kan utnyttjas för en "Regular Expression Denial of Service" attack.
- **Åtgärd:** Uppdatering till en säker version via `npm audit fix`.

### 3. Mime (Måttlig allvarlighet)
- **Sårbarhet:** Regular Expression Denial of Service i Mime (CVE-XXXX-XXXX)
- **Beskrivning:** Mime-paketet lider av en sårbarhet relaterad till reguljära uttryck, vilket kan resultera i en "Regular Expression Denial of Service" vid hantering av osäkert användarinmat.
- **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 4. MS (Måttlig allvarlighet)
- **Sårbarhet:** Ineffektiv komplexitet i reguljära uttryck i MS-paketet (CVE-XXXX-XXXX)
- **Beskrivning:** MS-paketet lider av en sårbarhet relaterad till ineffektiv komplexitet i reguljära uttryck, vilket kan utnyttjas för en form av attack.
- **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 5. Node-fetch (Hög allvarlighet)
- **Sårbarhet:** Exponering av känslig information till obehörig aktör i node-fetch (CVE-XXXX-XXXX)
- **Beskrivning:** Node-fetch-paketet lider av en sårbarhet som kan resultera i exponering av känslig information till en obehörig aktör.
- **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 6. QS (Hög allvarlighet)
- **Sårbarhet:** Prototypföroreningsskyddsbrott i QS (CVE-XXXX-XXXX)
- **Beskrivning:** QS-paketet lider av en sårbarhet relaterad till prototypförorening, som kan möjliggöra en attack.
- **Åtgärd:** Åtgärdat genom att köra `npm audit fix`.

### 7. Semver (Måttlig allvarlighet)
- **Sårbarhet:** Regular Expression Denial of Service i Semver (CVE-XXXX-XXXX)
- **Beskrivning:** Semver-paketet lider av en sårbarhet kopplad till reguljära uttryck, som kan potentiellt utnyttjas för en attack.
- **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

## Åtgärdsåtgärder

För att lösa dessa sårbarheter har vi vidtagit följande åtgärder:

- Uppgraderat sårbara paket till säkra versioner.
- Använt `npm audit fix` för att automatiskt uppdatera vissa beroenden.
- Utfört manuell kodändring för att undvika sårbarheter i vissa fall.

## Instruktioner för användare och utvecklare

1. Kör `npm audit fix` för att automatiskt åtgärda sårbarheter.
</details>

