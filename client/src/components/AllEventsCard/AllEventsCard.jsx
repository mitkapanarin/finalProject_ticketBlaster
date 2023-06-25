import React from 'react'

const AllEventsCard = ({_id, image, eventName, eventDate, price, eventDescription, eventLocation, button }) => {
  return (
    <div className="botom-all-events-card-container">
    <div className="botom-all-events-card-content">
      <img
        className="botom-all-events-card-image"
        src={image}
        alt={eventName}
        width="200"
        height="153"
      />
      <div className="parent">
        <h5 className="botom-all-events-card-title">{eventName}</h5>
        <div className="p-div">
          <p className="botom-all-events-card-date">{eventDate}</p>
          <p className="botom-all-events-card-location">{eventLocation}</p>
        </div>
      </div>
    </div>
    <button className="botom-all-events-card-button">{button}</button>
  </div>
  )
}

export default AllEventsCard