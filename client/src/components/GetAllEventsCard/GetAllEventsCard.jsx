import React from 'react'
import dayjs from "dayjs";
import "./GetAllEventsCard.css";
import {toast} from 'react-toastify'
import { useDeleteEventMutation } from '../../store/API/eventApi';

const GetAllEventsCard = ({
    eventName = "",
    image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
    eventDate = "",
    eventDescription = "",
    eventLocation = "",
    eventType,
    price,
    _id,
}) => {
    const [deleteEvent] = useDeleteEventMutation();

    const deleteEventHandler = async (_id) => {
        try {
            await toast.promise(deleteEvent(_id), {
                pending: "Deleting...",
                success: "Event Deleted",
                error: "Error Deleting Event",
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="botom-all-events-card-container">
                <div className="botom-all-events-card-content">
                    <img
                        className="botom-all-events-card-image"
                        src={image}
                        alt="World Map"
                        width="200"
                        height="153"
                    />
                    <div className="parent">
                        <h5 className="botom-all-events-card-title">{eventName}</h5>
                        <div className="p-div">
                            <p className="botom-all-events-card-date">
                                {" "}
                                {dayjs(eventDate).format("DD MMM, YYYY")}
                            </p>
                            <p className="botom-all-events-card-location">{eventLocation}</p>
                        </div>
                    </div>
                </div>
                <button
                    className="botom-all-events-card-button"
                    onClick={() => deleteEventHandler(_id)}
                >
                    Delete Event
                </button>

            </div>
        </div>
    )
}

export default GetAllEventsCard