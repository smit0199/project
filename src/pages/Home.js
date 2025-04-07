import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import "./home.css";

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
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error loading events:", error));
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
                                <div className="event-card" key={index}>
                                    <img src={event.image || "/images/default-event.jpg"} alt={event.title} />
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                    </div>
                    <button className="card-nav-button card-nav-right" onClick={() => scroll("right")}>&gt;</button>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Home;
