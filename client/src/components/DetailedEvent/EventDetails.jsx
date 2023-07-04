import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../../store/API/eventApi";

export const EventDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetEventQuery(params.eventId);
  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return <div>An event Details - {params.eventId}</div>;
};
