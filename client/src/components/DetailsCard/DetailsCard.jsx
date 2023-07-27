import React, { useState } from "react";
import "./DetailsCard.css";
import dayjs from "dayjs";
import { addToCart } from "../../store/Slices/basket";
import { useDispatch, useSelector } from "react-redux";
// import RelatedActsDetails from "../../Components/RelatedActs/RelatedActsDetails";
import { toast } from "react-toastify";
import { useGetAllEventsQuery } from "../../store/API/eventApi";
import Loader from "../../Components/Loader/Loader";
import Cards from "../../Components/Cards/Cards";
const DetailsCard = ({
  eventName,
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
  eventDate,
  eventDescription,
  eventLocation,
  eventType,
  price,
  _id,
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.User.isAuthenticated); // Assuming you have a slice that holds the authentication status


  const [quantity, setQuantity] = useState(0);

  const customerID = useSelector((state) => state.User._id);
  console.log(customerID);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // If user is not logged in, display a message or redirect to the login page
      toast.error("Please log in to add items to the cart");
      return;
    }
    try {
      await dispatch(
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
    } catch (err) {
      console.log(err);
      toast.error("Couldn't add item to cart, please try again");
    }
  };

  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  console.log("All Events Data:", data);

  const relatedEvents = data?.data
  ?.filter((item) => item?.eventType === eventType && item._id !== _id)
  .sort((a, b) => sortDate(a, b))
  .slice(0, 2); // Get the first two related events  The slice method takes two parameters: the start index and the end index (exclusive). By passing 0 as the start index and 2 as the end index, we are selecting the first two related events from the sorted array.

console.log("Related Events:", relatedEvents);

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="card-events-details">
      <div className="events-details">
        <h2>{eventName}</h2>
        <p>{dayjs(eventDate).format("DD MMM, YYYY")}, {eventLocation}</p>
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
          <p className="event-details-description">event Description{eventDescription}</p>
          <form onSubmit={handleForm}>
            <p className="event-details-card-date">Tickets ${price} USD</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <button type="submit" className="event-details-card-button">
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
