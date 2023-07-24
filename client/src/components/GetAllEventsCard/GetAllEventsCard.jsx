import React from 'react';
import dayjs from "dayjs";
import "./GetAllEventsCard.css";
import DeleteCard from '../DeleteCard/DeleteCard';

const GetAllEventsCard = ({
    eventName = "",
    image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
    eventDate = "",
    eventLocation = "",
    _id,
}) => {
    console.log(_id)

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
                                {dayjs(eventDate).format("DD MMM, YYYY")}
                            </p>
                            <p className="botom-all-events-card-location">{eventLocation}</p>
                        </div>
                    </div>
                </div>
                <DeleteCard eventID={_id} />
            </div>
        </div>
    );
};

export default GetAllEventsCard;
