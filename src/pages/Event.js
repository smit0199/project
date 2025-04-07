import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./event.css"
function Event() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error loading events:", error));
    }, []);
    return(
        <div className="event-page">
            <h1>Discover Events</h1>
            <div className="event-grid">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div className="event-card" key={event.id}>
                            <img src={event.image || "/images/default-event.jpg"} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <Link to={`/event/${event.id}`} className="more-info-btn">More Info</Link>
                        </div>
                    ))
                ) : (
                    <p>Loading events...</p>
                )}
            </div>
        </div>
    );
}
export default Event;