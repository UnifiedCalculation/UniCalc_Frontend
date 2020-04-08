  
import React from "react";

import "./loading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = props => {
  return (
    <div className="Loading">
      <h6>{props.text}</h6>
      <span style={{color: "#3f51b5", opacity: 0.5}}>
        <FontAwesomeIcon icon={faSpinner} pulse />
      </span>
    </div>
  );
};

export default Loading;