import React, { useState } from "react";
import "./PrintModal.css";

const PrintModal = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="print-user-modal">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="print-button"
        type="button"
      >
        Print
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-body" onClick={closeModal}>
              <span className="close-modal-button" onClick={closeModal}></span>
              <h2 className="printModal-card-h">ticketBlaster</h2>
              <img
                className="left-printModal-card-image"
                src={image}
                alt="Artist"
                width="200"
                height="153"
              />
              <div className="printModal-card-container">
                <div className="left-right-print">
                  <div className="left-printModal-card-content">
                    <h5 className="left-printModal-card-title">
                      Name of artist
                    </h5>
                    <p className="left-printModal-card-date">June 9th 2023</p>
                    <p className="left-printModal-card-location">
                      Skopje, Macedonia
                    </p>
                  </div>
                  <div className="right-printModal-card-content">
                  <img
                      className="qr-code-image"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
                      alt="qr-code"
                      width="200"
                      height="153"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintModal;
