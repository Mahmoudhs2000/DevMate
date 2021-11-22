import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;
