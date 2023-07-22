## Code Quality Checking tools

* prettier
* eslint
* pre-commit
* lint-staged
* lint
* husky


in Purchase--->Pusrcase price -->multuply quantity x price


in DetailsCard in Related Events I should add musicalConcerts data if user is buying ticket for music events or StrandUpComedy data if user is buying comedy event ticket

Admin can see list of all events,  delete event-->in network i got event not found

when admin is signed in he cant go to shopping cart


IN CREATE EVENTS I GOT ERR to fetch related events




import React from 'react';
import dayjs from 'dayjs';

const RelatedActs = ({
    eventName = "",
    image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
    eventDate,
    eventLocation = "",
}) => {
    return (
        <div>
            <div className='left-right'>
                <div className='left-related' >
                    <img
                        className="left-related-image"
                        src={image}
                        alt="World Map"
                        width="200"
                        height="153"
                    />
                </div>
                <div className='right-related'>
                    <h5 className="right-title">{eventName}</h5>
                    <p className="botom-event-card-date">
                        {" "}
                        {dayjs(eventDate).format("DD MMM, YYYY")}</p>
                    <p className="right-location">{eventLocation}</p>
                    <button className="right-button">Remove</button>
                </div>
            </div>
            <button>Save</button>
        </div>
    );
}

export default RelatedActs;
