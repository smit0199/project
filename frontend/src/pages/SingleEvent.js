import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../api"; 
import "./singleEvent.css"; 
import { useNavigate } from "react-router-dom";

function SingleEvent() {
    const { id } = useParams(); // get ID from URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const events = await getEvents(); // Fetch all and filter
                const selected = events.find((e) => e._id === id);
                setEvent(selected);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event:", error);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <p>Loading event details...</p>;
    if (!event) return <p>Event not found.</p>;

    return (
        <div className="single-event-container">
            <button onClick={() => navigate(-1)} className="back-btn">X</button>
            <h1>{event.title}</h1>
            <img src={event.image} alt={event.title} className="event-image" />
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
        </div>
    );
}

export default SingleEvent;
