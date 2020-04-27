  
import React from "react";

import "./loading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading(props) {
  return (
    <div className="Loading">
      <h6>{props.text}</h6>
        <FontAwesomeIcon icon={faSpinner} pulse />
    </div>
  );
};