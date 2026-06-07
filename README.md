# ParentChild Booking Engine

ParentChild Booking Engine is a small full-stack arena booking application. It demonstrates how a parent turf booking can block overlapping child turfs, and how child turf bookings can block their related parent turf.

The backend is a Spring Boot API that tracks bookings in memory. The frontend is a React + Vite app that shows live booked, blocked, and available arena slots.

## Features

- Book 7v7 parent turfs and 5v5 child turfs.
- Automatically block overlapping arenas after a booking.
- View booked, blocked, and available arenas in separate status sections.
- Reset all bookings during a session.
- Run the React UI locally with a Vite proxy to the Spring Boot API.

## Tech Stack

- Java 17
- Spring Boot 4
- Maven
- React 19
- Vite
- Axios
- Bootstrap

## Project Structure

```text
.
|-- src/main/java/com/parentChild
|   |-- ParentChildApplication.java
|   |-- config/ArenaOverlapConfig.java
|   |-- controller/BookingController.java
|   |-- model/
|   `-- service/BookingService.java
|-- src/main/resources/application.properties
|-- parentchild-ui
|   |-- src/
|   |-- package.json
|   `-- vite.config.js
|-- pom.xml
|-- mvnw
`-- mvnw.cmd
```

## Booking Rules

The available arena IDs are:

| Arena ID | Display Name | Format |
| --- | --- | --- |
| `P1` | `T1` | `7v7` |
| `P2` | `T2` | `7v7` |
| `C1` | `T1` | `5v5` |
| `C2` | `T2` | `5v5` |
| `C3` | `T3` | `5v5` |

Overlap rules are configured in `ArenaOverlapConfig`:

| Booked Arena | Blocked Arenas |
| --- | --- |
| `P1` | `C1`, `C2` |
| `P2` | `C2`, `C3` |
| `C1` | `P1` |
| `C2` | `P1`, `P2` |
| `C3` | `P2` |

Bookings are stored in memory, so they reset when the backend restarts.

## Prerequisites

- Java 17 or newer
- Node.js and npm

The backend uses the included Maven wrapper, so a separate Maven installation is not required.

## Run Locally

Start the backend from the project root:

```powershell
.\mvnw.cmd spring-boot:run
```

The API runs on:

```text
http://localhost:8080
```

In a second terminal, start the frontend:

```powershell
cd parentchild-ui
npm install
npm run dev
```

The UI runs on:

```text
http://localhost:5173
```

Vite proxies `/api` requests to `http://localhost:8080`, so the frontend can call the backend without changing the API base URL.

## API Endpoints

### Get Availability

```http
GET /api/availability
```

Example response:

```json
{
  "booked": ["P1"],
  "blocked": ["C1", "C2"],
  "available": ["P2", "C3"]
}
```

### Book an Arena

```http
POST /api/book
Content-Type: application/json

{
  "arenaId": "P1"
}
```

Possible responses:

```text
Booking successful
Already booked
```

### Reset Bookings

```http
POST /api/reset
```

Response:

```text
All bookings have been reset
```

## Useful Commands

Run backend tests:

```powershell
.\mvnw.cmd test
```

Build the backend:

```powershell
.\mvnw.cmd clean package
```

Run frontend linting:

```powershell
cd parentchild-ui
npm run lint
```

Build the frontend:

```powershell
cd parentchild-ui
npm run build
```

## Key Files

- `src/main/java/com/parentChild/config/ArenaOverlapConfig.java` defines all arenas and overlap rules.
- `src/main/java/com/parentChild/service/BookingService.java` contains booking, blocking, availability, and reset logic.
- `src/main/java/com/parentChild/controller/BookingController.java` exposes the REST API.
- `parentchild-ui/src/App.jsx` renders the booking board and status sections.
- `parentchild-ui/src/services/api.js` configures the frontend API client.
