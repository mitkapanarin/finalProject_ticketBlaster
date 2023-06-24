import React from 'react'

const AllEventsCard = ({image, artist, date, town, country, button }) => {
  return (
    <div className="botom-all-events-card-container">
    <div className="botom-all-events-card-content">
      <img
        className="botom-all-events-card-image"
        src={image}
        alt={artist}
        width="200"
        height="153"
      />
      <div className="parent">
        <h5 className="botom-all-events-card-title">{artist}</h5>
        <div className="p-div">
          <p className="botom-all-events-card-date">{date}</p>
          <p className="botom-all-events-card-location">{town}, {country}</p>
        </div>
      </div>
    </div>
    <button className="botom-all-events-card-button">{button}</button>
  </div>
  )
}

export default AllEventsCard