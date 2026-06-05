import { useEffect, useState } from "react";
import API from "./services/api";
import ArenaCard from "./components/ArenaCard";
import StatusSection from "./components/StatusSection";

function App() {

    const [availability, setAvailability] =
        useState({
            booked: [],
            blocked: [],
            available: []
        });

    const arenas = [
        {
            id: "P1",
            name: "T1",
            format: "7v7"
        },
        {
            id: "P2",
            name: "T2",
            format: "7v7"
        },
        {
            id: "C1",
            name: "T1",
            format: "5v5"
        },
        {
            id: "C2",
            name: "T2",
            format: "5v5"
        },
        {
            id: "C3",
            name: "T3",
            format: "5v5"
        }
    ];

    const arenaById = Object.fromEntries(
        arenas.map(arena => [
            arena.id,
            arena
        ])
    );

    const getDisplayArenas = (arenaIds = []) =>
        arenaIds.map(arenaId =>
            arenaById[arenaId] || {
                id: arenaId,
                name: arenaId,
                format: ""
            }
        );

    const loadAvailability = async () => {

        try {

            const response =
                await API.get("/availability");

            setAvailability(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        loadAvailability();

    }, []);

    const bookArena = async (arenaId) => {

        try {

            await API.post(
                "/book",
                {
                    arenaId
                }
            );

            loadAvailability();

        } catch (error) {

            console.error(error);

        }
    };

    const resetBookings = async () => {

        try {

            await API.post("/reset");

            loadAvailability();

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <main className="app-shell">

            <section className="app-header">

                <div>

                    <p className="app-kicker">
                        Live Arena Availability
                    </p>

                    <h1>
                        ParentChild Booking Engine
                    </h1>

                </div>

                <button
                    className="btn btn-reset"
                    onClick={resetBookings}
                >
                    Reset Bookings
                </button>

            </section>

            <section className="booking-board">

                <div className="board-header">

                    <div>

                        <p className="section-label">
                            Arena Slots
                        </p>

                        <h2>
                            Select a turf
                        </h2>

                    </div>

                </div>

                <div className="arena-grid">

                {
                    arenas.map(arena => (

                        <ArenaCard
                            key={arena.id}
                            arena={arena}
                            onBook={bookArena}
                            disabled={
                                !availability.available.includes(arena.id)
                            }
                        />

                    ))
                }

                </div>

            </section>

            <section className="status-grid">

                <div>

                    <StatusSection
                        title="Booked"
                        tone="booked"
                        data={getDisplayArenas(availability.booked)}
                    />

                </div>

                <div>

                    <StatusSection
                        title="Blocked"
                        tone="blocked"
                        data={getDisplayArenas(availability.blocked)}
                    />

                </div>

                <div>

                    <StatusSection
                        title="Available"
                        tone="available"
                        data={getDisplayArenas(availability.available)}
                    />

                </div>

            </section>

        </main>
    );
}

export default App;
