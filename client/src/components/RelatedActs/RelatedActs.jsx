import React from 'react';
import dayjs from 'dayjs';
import "./RelatedActs.css";

const RelatedActs = ({
    eventName = "",
    image,
    eventDate,
    eventLocation = "",
    handleRemoveRelatedEvent,
    _id, // Assuming your event ID property is named "_id"
}) => {
    const handleRemoveClick = () => {
        handleRemoveRelatedEvent(_id); // Call the parent's function to remove the related event
    };

    return (
        <div className="related-acts">
            <div className="bottom-cards">
                <div className="botom-left-event-card-container">
                    <img
                        className="botom-left-event-card-image"
                        src={image}
                        alt="Event"
                        width="200"
                        height="153"
                    />
                </div>
                <div className='botom-right-event-card-container'>
                    <div className="botom--event-card-details">
                        <h5 className="botom--event-card-title">{eventName}</h5>
                        <p className="botom--event-card-date">{dayjs(eventDate).format("DD MMM, YYYY")}</p>
                        <p className="botom--event-card-location">{eventLocation}</p>
                        <button
                            className="remove-related-event-btn"
                            onClick={handleRemoveClick}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatedActs;
