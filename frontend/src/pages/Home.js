import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import "./home.css";
import { getEvents } from '../api';

function Home() {
    const [events, setEvents] = useState([]);

    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            if (direction === "left") {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

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

    return (
        <div className="home-container">
            <header className="banner-section">
                <h1>Welcome to Festoria </h1>
                <p>Discover, Create, and Join Exciting Events from Anywhere!</p>
                <Link to="/event" className="cta-button">Explore Events</Link>
            </header>
            <section className="events-section">
                <h2>Upcoming Local Events</h2>
                <div className="carousel-container">
                    <button className="card-nav-button card-nav-left" onClick={() => scroll("left")}>&lt;</button>
                    <div className="events-grid" ref={scrollRef}>
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <div className="event-card" key={event._id}>
                                    <img src={event.image || "/images/default-event.jpg"} alt={event.title} />
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                </div>
                            ))
                        ) : (
                            <div className="loader"></div>
                        )}
                    </div>
                    <button className="card-nav-button card-nav-right" onClick={() => scroll("right")}>&gt;</button>
                </div>
            </section>
        </div>
    );
}

export default Home;
