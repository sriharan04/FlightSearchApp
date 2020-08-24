import React from "react";
import classes from "./RoundTripDetails.module.css";
import AirCraftDeatils from "../AirCraftsDeatils/AirCraftDeatils";
const RoundTripDetails = (props) => {
  return (
    <div className={classes.roundTirp}>
      <div className={classes.depart}>
        <AirCraftDeatils details={props.data} />
      </div>
    </div>
  );
};

export default RoundTripDetails;
