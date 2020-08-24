import React from "react";
import classes from "./RowComponent.module.css";
import airindia from "../../assets/air-india-logo-vector.png";
import { time } from "../../Utility/Utility";
const RowComponent = (props) => {
  let intervalTime = time(props.data.departureTime, props.data.arrivalTime);

  return (
    <li>
      <div className={classes.img_off}>
        <img src={airindia} alt="flight" width="50" height="50" />
      </div>
      <div className={classes.craft_detail}>
        <h4>{props.data.name}</h4>
        <p>{props.data.flightNo}</p>
      </div>
      <div className={classes.craft_depart}>
        <h4>{props.data.departureTime}</h4>
        <p>{props.data.origin}</p>
      </div>
      <div className={classes.craft_arrival}>
        <h4>{props.data.arrivalTime}</h4>
        <p>{props.data.destination}</p>
      </div>
      <div className={classes.craft_total_time}>
        <h4>
          {intervalTime[0]}h {intervalTime[1]}0m
        </h4>
        <p>Non stop</p>
      </div>
      <div className={classes.craft_total_price}>
        <h4>₹{props.data.price}</h4>
      </div>
      <div className={classes.craft_book}>
        <div className={classes.cart}>Book</div>
      </div>
    </li>
  );
};

export default RowComponent;
