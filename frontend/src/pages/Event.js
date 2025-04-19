import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./event.css"
import { getEvents } from '../api';
import { FiSearch } from "react-icons/fi";

function Event() {

    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error loading events:", error);
            }
        };
        fetchEvents();
    }, []);

    // const filteredEvents = events.filter((event) =>{
    //     const term = searchTerm.toLowerCase();
    //     return (
    //         event.title.toLowerCase().includes(term) ||
    //         (event.organizer && event.organizer.toLowerCase().includes(term)) ||
    //         (event.date && new Date(event.date).toLocaleDateString().includes(term))
    //     );
    // });

    return(
        <div className="event-page">
            <div className="event-header">
                <h1>Discover Events</h1>
                <div className="search-container">
                    <input type="text" className="search-bar" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <FiSearch className="search-icon" />
                </div>
                
            </div>
            <div className="event-grid">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div className="event-card" key={event.id}>
                            <img src={event.image || "/images/default-event.jpg"} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            {/* {event.organizer && <p><strong>Organizer:</strong> {event.organizer}</p>} */}
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