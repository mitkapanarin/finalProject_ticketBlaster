import React, { useState } from "react";
import "./DeleteCard.css";
import { useDeleteEventMutation } from "../../store/API/eventApi";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteEventSuccess } from "../../store/Slices/eventSlice";


const DeleteCard = ({ eventID }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const dispatch = useDispatch();
    const [deleteEvent] = useDeleteEventMutation();

    const deleteEventHandler = async () => {
        try {
          await toast.promise(deleteEvent(eventID), { 
            pending: 'Deleting...',
            success: 'Event Deleted',
            error: 'Error Deleting Event',
          });
    
          // Dispatch the deleteEventSuccess action to update the Redux store
        //   dispatch(deleteEventSuccess(eventID));
        } catch (err) {
          console.log(err);
        }
      };
      

    return (
        <div className="print-user-modal">
            <button
                onClick={() => setIsOpen(!isOpen)}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="delete-button"
                type="button"
            >
                Delete
            </button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-body">
                            <span className="close-modal-button" onClick={closeModal}></span>
                            <h2 className="DeleteCard-card-h">Are you sure?</h2>
                            <p>You are about to delete an event from the system. Please proceed with caution.</p>
                            <button
                                className="botom-all-events-card-button"
                                onClick={deleteEventHandler}
                            >
                                Delete Event
                            </button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteCard;
