# Jsramverket-Backend

Välkommen till Gruppen! Detta projekt använder olika npm-paket för att driva applikationen. För att säkerställa att projektet är säkert har vi genomfört en säkerhetsgranskning med hjälp av `npm audit`. Nedan hittar du en lista över de identifierade sårbarheterna och de åtgärder som har vidtagits för att lösa dem.

<details> 
 <summary><code>1. Beskriv i README.md vilka säkerhetshål ni hittade och hur ni åtgärdade de.</code></summary>

## Identifierade sårbarheter

### 1. Debug (Hög allvarlighet)

-   **Sårbarhet:** Ineffektiv komplexitet i reguljära uttryck
-   **Beskrivning:** Debug-paketet lider av en sårbarhet som rör ineffektivitet i reguljära uttryck, vilket kan leda till en form av "Regular Expression Denial of Service".
-   **Åtgärd:** Debug har uppgraderats till en säker version.

### 2. Fresh (Hög allvarlighet)

-   **Sårbarhet:** Regular Expression Denial of Service i Fresh
-   **Beskrivning:** Fresh-paketet lider av en sårbarhet kopplad till reguljära uttryck, som potentiellt kan utnyttjas för en "Regular Expression Denial of Service" attack.
-   **Åtgärd:** Uppdatering till en säker version via `npm audit fix`.

### 3. Mime (Måttlig allvarlighet)

-   **Sårbarhet:** Regular Expression Denial of Service i Mime
-   **Beskrivning:** Mime-paketet lider av en sårbarhet relaterad till reguljära uttryck, vilket kan resultera i en "Regular Expression Denial of Service" vid hantering av osäkert användarinmat.
-   **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 4. MS (Måttlig allvarlighet)

-   **Sårbarhet:** Ineffektiv komplexitet i reguljära uttryck i MS-paketet
-   **Beskrivning:** MS-paketet lider av en sårbarhet relaterad till ineffektiv komplexitet i reguljära uttryck, vilket kan utnyttjas för en form av attack.
-   **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 5. Node-fetch (Hög allvarlighet)

-   **Sårbarhet:** Exponering av känslig information till obehörig aktör i node-fetch
-   **Beskrivning:** Node-fetch-paketet lider av en sårbarhet som kan resultera i exponering av känslig information till en obehörig aktör.
-   **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

### 6. QS (Hög allvarlighet)

-   **Sårbarhet:** Prototypföroreningsskyddsbrott i QS
-   **Beskrivning:** QS-paketet lider av en sårbarhet relaterad till prototypförorening, som kan möjliggöra en attack.
-   **Åtgärd:** Åtgärdat genom att köra `npm audit fix`.

### 7. Semver (Måttlig allvarlighet)

-   **Sårbarhet:** Regular Expression Denial of Service i Semver
-   **Beskrivning:** Semver-paketet lider av en sårbarhet kopplad till reguljära uttryck, som kan potentiellt utnyttjas för en attack.
-   **Åtgärd:** Åtgärdat genom att uppgradera till en säker version.

## Åtgärdsåtgärder

För att lösa dessa sårbarheter har vi vidtagit följande åtgärder:

-   Uppgraderat sårbara paket till säkra versioner.
-   Använt `npm audit fix` för att automatiskt uppdatera vissa beroenden.
-   Utfört manuell kodändring för att undvika sårbarheter i vissa fall.

## Instruktioner för användare och utvecklare

1. Kör `npm audit fix` för att automatiskt åtgärda sårbarheter.
 </details>

<details> 
 <summary><code>2. Beskriv i README.md vilka steg ni fick gå igenom för att få applikationen att fungera.</code></summary>

## Trafikverkets API nyckel

För att starta applikationen behövde vi fixa en egen API nyckel från Trafikverket. Vi lade den i en .env fil och exkluderade den från GitHub eftersom den typen av information anses vara känslig.

## Databas

Dessutom behövde vi köra en migration för att skapa tabellen "trains" i databasen.

## Favicon

Vi var också tvungna att lägga till en favicon bild så att frontend delen av applikationen skulle fungera utan några fel.

 </details>

<details> 
 <summary><code>3. Val av Frontend Ramverk.</code></summary>
 - React

 </details>

# Interacting with the API

 <details>
 <summary><code>Making a GET Request</code></summary>
To retrieve ticket information, follow these steps:

**Request Method:** Use the GET method.

**Endpoint:** Send the GET request to `http://localhost:1337/tickets`.

**Response:** You will receive a JSON response containing a list of ticket data. Each ticket object includes fields such as `id`, `code`, `trainnumber`, and `traindate`. Here's an example response:

```json
[
	{
		"id": "11239vjasd0912",
		"code": "ABC123",
		"trainnumber": "12345",
		"traindate": "2023-09-10"
	},
	{
		"id": "2asdajsdj21212",
		"code": "XYZ456",
		"trainnumber": "67890",
		"traindate": "2023-09-11"
	}
]
```

 </details>

 <details>
 <summary><code>Making a POST Request</code></summary>
To create a new ticket, follow these steps:

**Request Method:** Use the POST method.

**Endpoint:** Send the POST request to `http://localhost:1337/tickets`.

**Request Body:** In the request body, provide the data for creating a ticket in JSON format. For example:

```json
{
	"code": "ABC123",
	"trainnumber": "12345",
	"traindate": "2023-09-10"
}
```

Replace the values with the actual data you want to use for creating the ticket.

**Response:** You will receive a JSON response indicating the success or failure of the ticket creation. A successful response might look like this:

```json
{
	"data": {
		"id": "3",
		"code": "ABC123",
		"trainnumber": "12345",
		"traindate": "2023-09-10"
	}
}
```

 </details>
