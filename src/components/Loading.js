import React, { Component } from "react";
import loading from "./Book.gif";

const Loading = () => {
  return (
    <div className="text-center mb-4">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
