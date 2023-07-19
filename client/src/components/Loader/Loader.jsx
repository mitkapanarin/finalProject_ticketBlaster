import React from "react";
import "./Loader.css";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <BeatLoader color="#FFFFFF" />
          <h3
            style={{
              color: "#FFFFFF",
            }}
          >
            Loading, Please Wait.....
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Loader;
