import React, { useEffect, useState } from "react";
import { usePurchaseHistoryQuery } from "../../store/API/salesAPI";
import { useSelector } from "react-redux";
import "./TicketHistory.css";
import AdminTab from "../../Components/AdminTab/AdminTab";
import { useGetMultipleEventsMutation } from "../../store/API/eventApi";
import History from "../History/History";
import Loader from "../../Components/Loader/Loader";

const TicketHistory = () => {
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

  return (
    <div className="card-ticket-history">
      <AdminTab pageName={"Ticket History"} />
      <div className="histroy-parent">
        {eventData?.map((event) => (
          <History key={event?._id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default TicketHistory;
