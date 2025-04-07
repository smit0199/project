// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { MongoClient } from "mongodb";
// import "./createEvent.css";

// const MONGO_URL = "mongodb://localhost:27017/";

// function CreateEvent() {
//     const [event, setEvent] = useState
//     ({ 
//         title: "", 
//         description: "", 
//         date: "",
//         location: "",
//         image: "" 
//     });

// //     const handleChange = (e) => setEvent
// //     ({ 
// //         ...event, [e.target.name]: e.target.value 
// //     });

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try{
// //             const client = new MongoClient(MONGO_URL);
// //             await client.connect();
// //             const db = client.db("project");
// //             const collection = db.collection("events-data");
// //             await collection.insertOne(event);
// //             alert("Event Created...");
// //             client.close();
// //         }catch (error) {
// //             // console.error("Error",error);
// //             // alert("Something went wrong, try again...");
// //             console.log(error);
// //         }
// //     };


//     return (
//         <div className="createEventContainer">
//             <div className="create-event-container">
//                 <h1>Create an Event</h1>
//                 <form className="event-form" onSubmit={handleSubmit}>
//                     {/* <label>Event Title:</label> */}
//                     <input type="text" name="title" value={event.title} onChange={handleChange} placeholder="Event Title" required />

//                     {/* <label>Description:</label> */}
//                     <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" required />

//                     {/* <label>Date & Time:</label> */}
//                     <input type="datetime-local" name="date" value={event.date} onChange={handleChange} placeholder="Date & Time" required />

//                     {/* <label>Location:</label> */}
//                     <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Location" required />

//                     {/* <label>Event Image URL:</label> */}
//                     <input type="text" name="image" value={event.image} onChange={handleChange} placeholder="Paste image URL" required/>

//                     <button type="submit" className="submit-button">Create Event</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateEvent;
