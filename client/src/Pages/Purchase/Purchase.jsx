import React, { useState, useEffect } from "react";
import { usePurchaseHistoryQuery } from "../../store/API/salesAPI";
import { useGetMultipleEventsMutation } from "../../store/API/eventApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import PurchaseCard from "../../Components/PurchaseCard/PurchaseCard";
import "../Purchase/Purchase.css";

const Purchase = () => {
  const [eventData, setEventData] = useState([]);
  const [
    getMultipleEvents,
    { isLoading: eventsLoading, isError: eventsError },
  ] = useGetMultipleEventsMutation();
  const customerID = useSelector((state) => state?.User?._id);
  const { data: purchaseHistoryData, isLoading: purchaseHistoryLoading } =
    usePurchaseHistoryQuery(customerID);
  const eventIDs = purchaseHistoryData?.data?.map((event) => event.eventID);

  async function fetchMultipleEventsData() {
    const fetchedData = await getMultipleEvents({
      eventIDs,
    });
    setEventData(fetchedData?.data?.data);
  }

  useEffect(() => {
    if (eventIDs?.length === 0) return;
    else {
      fetchMultipleEventsData();
    }
  }, [purchaseHistoryData]);

  if (purchaseHistoryLoading || eventsLoading) return <Loader />;

  if (eventsError) <h1>Something went wrong</h1>;

  const eventDataWithQuantity = eventData?.map((event) => {
    const quantity = purchaseHistoryData?.data?.find(
      (item) => item.eventID === event?._id
    ).quantity;
    return { ...event, quantity };
  });
  return (
    <div>
      <h2 className="Purchase-card-h">Thank you for your purchase!</h2>
      {eventDataWithQuantity?.map((event) => (
        <PurchaseCard key={event?._id} {...event} />
      ))}
      <hr className="hr-sc" />
    </div>
  );
};

export default Purchase;
