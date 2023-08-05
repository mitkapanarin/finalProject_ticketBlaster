import React from 'react';
import dayjs from 'dayjs';
import "./RelatedActs.css"

const RelatedActs = ({
    eventName = "",
    image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
    eventDate,
    eventLocation = "",
}) => {
    return (
        <div >
            <div className="bottom-cards">
                <div className="botom-left-event-card-container">
                    <img
                        className="botom-left-event-card-image"
                        src={image}
                        alt="World Map"
                        width="200"
                        height="153"
                    />
                </div>
                <div className='botom-right-event-card-container'>
                    <div className="botom--event-card-details">
                        <h5 className="botom--event-card-title">{eventName}</h5>
                        <p className="botom--event-card-date">{dayjs(eventDate).format("DD MMM, YYYY")}</p>
                        <p className="botom--event-card-location">{eventLocation}</p>
                        <button className="botom-left-event-card-button">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelatedActs;
