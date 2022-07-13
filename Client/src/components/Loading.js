import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="spinner">
      <div
        className="spinner-border"
        style={{ width: "10rem", height: "10rem" }}
      ></div>
      
    </div>
  );
};

export default Loading;
