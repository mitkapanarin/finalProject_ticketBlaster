import React, { useEffect, useState } from "react";
import { usePurchaseHistoryQuery } from "../../store/API/salesAPI";
import { useSelector } from "react-redux";
import "./TicketHistory.css";
import AdminTab from "../../Components/AdminTab/AdminTab";
import Ticket from "../../components/Ticket/Ticket";
import { useGetMultipleEventsMutation } from "../../store/API/eventApi";
import Purchase from "../Purchase/Purchase"
import Cards from "../../components/Cards/Cards";

const TicketHistory = () => {
  const [eventData, setEventData] = useState([]);
  const [getMultipleEvents, { isLoading, isError }] =
    useGetMultipleEventsMutation();
  const customerID = useSelector((state) => state?.User?._id);
  const { data: purchaseHistoryData } = usePurchaseHistoryQuery(customerID);
  const eventIDs = purchaseHistoryData?.data?.map((event) => event.eventID);

  useEffect(() => {
    async function fetchMultipleEventsData() {
      const fetchedData = await getMultipleEvents({ eventIDs });
      setEventData(fetchedData?.data?.data);
      console.log("fetchedData", fetchedData);
    }
    fetchMultipleEventsData();
  }, []);

  return (
    <div className="card-ticket-history">
      <AdminTab pageName={"Ticket History"} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong...</div>}
      {eventData?.map((event) => (
        <>
        <Cards/>
          <Ticket key={event?._id} {...event} />
          <Purchase/>
        </>
      ))}
    </div>
  );
};

export default TicketHistory;
