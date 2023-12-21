import React, { Component } from "react";
import loading from "./Book.gif";

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center mb-4">
        <img src={loading} alt="loading" />
      </div>
    );
  }
}
