import React from "react";
import classes from "./Empty.module.css";
import flight from "../../assets/flight_icon.jpg";

const Empty = () => {
  return (
    <div className={classes.noflight}>
      <div className={classes.layout}>
        <img
          src={flight}
          alt="flight"
          width="45"
          height="45"
          className={classes.head_icon2}
        />
        <h2>No Fligts searched</h2>
      </div>
    </div>
  );
};

export default Empty;
