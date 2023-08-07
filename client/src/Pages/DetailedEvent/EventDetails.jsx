import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../../store/API/eventApi";
import DetailsCard from "../../Components/DetailsCard/DetailsCard";

const EventDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetEventQuery(params.eventId);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div>
      <DetailsCard
        {...data?.data}
        relatedEventsIds={data?.data?.relatedEventsIds}
      />
    </div>
  );
};

export default EventDetails;
