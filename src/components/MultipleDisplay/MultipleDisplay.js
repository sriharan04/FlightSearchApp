import React from "react";
import classes from "./MultipleDisplay.module.css";
import airindia from "../../assets/air-india-logo-vector.png";
import spicejet from "../../assets/logo1.png";
import { time } from "../../Utility/Utility";
import defaultflight from "../../assets/flight_icon.jpg";
const MultipleDisplay = (props) => {
  let intervalTime1 = time(
    props.data.x_departureTime,
    props.data.x_arrivalTime
  );
  let intervalTime2 = time(props.data.departureTime, props.data.arrivalTime);
  let LayoverTime = time(props.data.x_arrivalTime, props.data.departureTime);
  let icon;
  let icon1;
  if (props.data.x_flightNo.includes("AI")) {
    icon = airindia;
  }
  if (props.data.x_flightNo.includes("SJ")) {
    icon = spicejet;
  }
  if (props.data.flightNo.includes("AI")) {
    icon1 = airindia;
  }
  if (props.data.flightNo.includes("SJ")) {
    icon1 = spicejet;
  }
  if (props.data.flightNo.includes("TW")) {
    icon1 = defaultflight;
  }
  if (props.data.x_flightNo.includes("TW")) {
    icon = defaultflight;
  }
  return (
    <li className={classes.li}>
      <div className={classes.img_off}>
        <img src={icon} alt="flight" width="50" height="50" />
      </div>
      <div className={classes.craft_detail}>
        <h4>{props.data.x_name}</h4>
        <p>{props.data.x_flightNo}</p>
      </div>
      <div className={classes.craft_depart}>
        <h4>{props.data.x_departureTime}</h4>
        <p>{props.data.x_origin}</p>
      </div>
      <div className={classes.craft_arrival}>
        <h4>{props.data.x_arrivalTime}</h4>
        <p>{props.data.x_destination}</p>
      </div>
      <div className={classes.craft_total_time}>
        <h4>
          {intervalTime1[0]}h {intervalTime1[1]}0m
        </h4>
        <p>Non stop</p>
      </div>
      <div className={classes.layover_time}>
        <p>
          Layover time {LayoverTime[0]}h {LayoverTime[1]}0m
        </p>
      </div>
      <div className={classes.img_off1}>
        <img src={icon1} alt="flight" width="50" height="50" />
      </div>
      <div className={classes.craft_detail1}>
        <h4>{props.data.name}</h4>
        <p>{props.data.flightNo}</p>
      </div>
      <div className={classes.craft_depart1}>
        <h4>{props.data.departureTime}</h4>
        <p>{props.data.origin}</p>
      </div>
      <div className={classes.craft_arrival1}>
        <h4>{props.data.arrivalTime}</h4>
        <p>{props.data.destination}</p>
      </div>
      <div className={classes.craft_total_time1}>
        <h4>
          {intervalTime2[0]}h {intervalTime2[1]}0m
        </h4>
        <p>Non stop</p>
      </div>
    </li>
  );
};

export default MultipleDisplay;
