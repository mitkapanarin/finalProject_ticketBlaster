import React from 'react'
import dayjs from "dayjs";
import PrintModal from "../PrintModal/PrintModal";

const PurchaseCard = ({
    eventName = "",
    image = "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emqhuigtaseacrhvgfcr.png",
    eventDate = "",
    eventLocation = "",
    price,
}) => {
  return (
    <div>
                    <div className="Purchase-card-container">
                <div className="left-Purchase-card-container">
                    <img
                        className="left-Purchase-card-image"
                        src={image}
                        alt="World Map"
                        width="200"
                        height="153"
                    />
                    <div className="left-Purchase-card-content">
                        <h5 className="left-Purchase-card-title">{eventName}</h5>
                        <p className="left-Purchase-card-date">
                            {" "}
                            {dayjs(eventDate).format("DD MMM, YYYY")}
                        </p>
                        <p className="left-Purchase-card-location">{eventLocation}</p>
                    </div>
                </div>
                <div className="purchase-right-sec">
                    <div className="Purchase-price">
                        <p className="Purchase-total-price">${price}</p>
                        <p className="Purchase-total-tickets">2x60.00USD</p>
                    </div>
                    <PrintModal />
                </div>
            </div>
    </div>
  )
}

export default PurchaseCard