import React from "react";
import { BallBeat } from "react-pure-loaders";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "4rem auto",
      }}
    >
      <h2
        style={{
          fontFamily: "monospace",
          margin: "0rem 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        Loading
        <BallBeat color={"#123abc"} loading={true} />
      </h2>
    </div>
  );
}
