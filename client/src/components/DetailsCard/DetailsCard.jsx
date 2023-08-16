import React, { useState } from "react";
import "./DetailsCard.css";
import dayjs from "dayjs";
import { addToCart } from "../../store/Slices/basket";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetAllEventsQuery } from "../../store/API/eventApi";
import Loader from "../../Components/Loader/Loader";
import Cards from "../../Components/Cards/Cards";

const DetailsCard = ({
  eventName,
  image,
  eventDate,
  eventDescription,
  eventLocation,
  eventType,
  price,
  _id,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.User.token);
  const [quantity, setQuantity] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!token) {
      // If user is not logged in, display a message or redirect to the login page
      toast.error("Please log in to add items to the cart");
      return;
    }
    if (quantity < 1 && hasInteracted) {
      // Show error message if quantity is less than 1 and user has interacted with the input field
      toast.error("Quantity must be 1 or more");
      return;
    }
    try {
      dispatch(
        addToCart({
          quantity,
          eventName,
          image,
          eventDate,
          eventDescription,
          eventLocation,
          eventType,
          price,
          _id,
        })
      );
      toast.success("Item added to cart successfully 👌");
      setQuantity(0); // Reset the quantity to 0 after adding to cart
      setHasInteracted(false); // Reset the interaction state when adding to cart
    } catch (err) {
      console.log(err);
      toast.error("Couldn't add item to cart, please try again");
    }
  };

  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const relatedEvents = data?.data
    ?.filter((item) => item?.eventType === eventType && item._id !== _id)
    .sort((a, b) => sortDate(a, b))
    .slice(0, 2);

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  const handleQuantityChange = (e) => {
    const newQuantity = +e.target.value;
    setQuantity(newQuantity);
    if (newQuantity !== 0) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="card-events-details">
      <div className="events-details">
        <h2>{eventName}</h2>
        <p>
          {dayjs(eventDate).format("DD MMM, YYYY")}, {eventLocation}
        </p>
      </div>
      <div className="event-details-card-container">
        <img
          className="event-details-card-image"
          src={image}
          alt="World Map"
          width="200"
          height="153"
        />
        <div className="event-details-card-content">
          <h5 className="event-details-card-title">About</h5>
          <p className="event-details-description">
            event Description{eventDescription}
          </p>

          <form onSubmit={handleForm}>
            <p className="event-details-card-date">Tickets ${price} USD</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            {quantity < 1 && hasInteracted && (
              <p className="error-message">Quantity must be 1 or more</p>
            )}
            <button
              type="submit"
              className="event-details-card-button"
              disabled={quantity < 1}
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
      <h2>Related Acts</h2>
      <div className="bottom-cards">
        {relatedEvents?.map((item) => (
          <Cards key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DetailsCard;
