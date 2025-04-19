import React, { useState } from "react";
import "./createEvent.css";

function CreateEvent() {
    return (
        <div className="createEventContainer">
            <div className="create-event-container">
                <h1>Create an Event</h1>
                <form className="event-form" >
                    {/* <label>Event Title:</label> */}
                    <input type="text" name="title" value="title" placeholder="Event Title" required />

                    {/* <label>Description:</label> */}
                    <textarea name="description" value="description" placeholder="Description" required />

                    {/* <label>Date & Time:</label> */}
                    <input type="datetime-local" name="date" value="date"  placeholder="Date & Time" required />

                    {/* <label>Location:</label> */}
                    <input type="text" name="location" value="location" placeholder="Location" required />

                    {/* <label>Event Image URL:</label> */}
                    <input type="text" name="image" value="image" placeholder="Paste image URL" required/>

                    <button type="submit" className="submit-button">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
