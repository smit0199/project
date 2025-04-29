import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getEvents,sendConfirmationSMS } from "../api"; 
import "./singleEvent.css"; 

function SingleEvent() {
    const { id } = useParams(); // get ID from URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [phone, setPhone] = useState("+91");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

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

    const handleSendSMS = async () => {
        if (!phone || phone.length < 10) {
            setMessage("Please enter a valid phone number.");
            return;
        }

        setSending(true);
        try {
            await sendConfirmationSMS(phone, event.title, event.date);
            // console.log(res);
            setMessage("Confirmation SMS sent!");
            // setMessage(response.message)
            
            setTimeout(() => {
                setMessage(""); // Clear the message
                setPhone("+91"); // Reset phone input to "+91"
            }, 2000); // Wait 2 seconds before clearing

        } catch (err) {
            console.error("Error sending SMS:", err);

            setMessage("Failed to send SMS.");
            setTimeout(() => {
                setMessage(""); // Clear the error message
            }, 2000); // Wait 2 seconds before clearing the error

        } finally {
            
            setSending(false);
            setTimeout(()=>{
                setMessage(""); 
            },2000)
            
        }
    };

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
            
            <button onClick={() => setShowPopup(true)} className="join-btn">Join in Event</button>

            {showPopup && (
            <div className="popup">
                <div className="popup-content">
                    <h3>Enter your phone number</h3>
                    
                    <input type="tel" placeholder="+91xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <br/>
                    <br/>
                    <button onClick={handleSendSMS} className="pop-sub-btn">Submit</button>
                    <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
                    
                    {message && <p className="sms-status">{message}</p>}
                </div>
                
            </div>
            )}

        </div>
    );
}

export default SingleEvent;
