import React, { useState } from "react";
import { createEvent } from '../api';
import "./createEvent.css";

function CreateEvent() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const event = await createEvent(formData);  // Call the API function
            console.log('Event created successfully:', event);
            alert("Event created successfully!");
        } catch (error) {
            console.error('Error creating event:', error);
            alert("There was an error creating the event.");
        }
    };

    return (
        <div className="createEventContainer">
            <div className="create-event-container">
                <h1>Create an Event</h1>
                <form className="event-form" onSubmit={handleSubmit} >
                    {/* <label>Event Title:</label> */}
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Event Title" required />

                    {/* <label>Description:</label> */}
                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />

                    {/* <label>Date & Time:</label> */}
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} placeholder="Date & Time" required />

                    {/* <label>Location:</label> */}
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />

                    {/* <label>Event Image URL:</label> */}
                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Paste image URL" required/>

                    <button type="submit" className="submit-button">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
