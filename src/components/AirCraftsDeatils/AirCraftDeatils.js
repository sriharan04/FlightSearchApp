import React from "react";
import RowComponent from "../RowComponent/RowComponent";
import classes from "./AirCraftDeatils.module.css";
import head_icon from "../../assets/flight_icon.jpg";
import { useLocation } from "react-router-dom";
import { availableflight, connectflight } from "../../Utility/Utility";
import Multiple from "../../components/MultipleDetails/MultipleDeatils";
const AircraftDeatils = (props) => {
  let rowcompo = {};
  let location = useLocation();
  let origin = location.state.orderForm.origin.value;
  let destiantion = location.state.orderForm.destination.value;
  let departdate = location.state.orderForm.departure.value;
  let returndate = location.state.orderForm.Return.value;
  let out = availableflight(props.details, origin, destiantion, departdate);
  let out1 = connectflight(props.details, origin, destiantion, departdate);
  let heading = departdate.toString().split(" ");
  let heading1 = returndate.toString().split(" ");
  let path = location.state.paths;
  let round;
  let roundmultiple;
  let rowcompo1;
  let multidisplay1;
  if (returndate) {
    round = availableflight(props.details, destiantion, origin, returndate);
    roundmultiple = connectflight(
      props.details,
      destiantion,
      origin,
      returndate
    );
    if (round) {
      rowcompo1 = round.map((el) => {
        return <RowComponent key={el.flightno} data={el} />;
      });
    }
    multidisplay1 = roundmultiple.map((el) => {
      return <Multiple key={el.flightno} data={el} />;
    });
  }

  if (out) {
    rowcompo = out.map((el) => {
      return <RowComponent key={el.flightno} data={el} />;
    });
  }
  let multidisplay = out1.map((el) => {
    return <Multiple key={el.flightno} data={el} />;
  });

  let trip = null;
  if (path === "/oneway") {
    trip = (
      <div className={classes.aircraft_layout}>
        <div className={classes.head_deatils}>
          <img
            alt="flight"
            src={head_icon}
            width="45"
            height="45"
            className={classes.head_icon}
          />
          <h4 className={classes.head_title}>
            {origin} to {destiantion}
          </h4>
          <p className={classes.head_date}>
            {out.length + out1.length} flights found {heading[0]},{heading[2]}{" "}
            {heading[1]}
          </p>
        </div>
        <ul className={classes.onelist}>
          {rowcompo}
          {multidisplay}
        </ul>
      </div>
    );
  }

  if (path === "/roundtrip") {
    let first = (
      <div className={classes.aircraft_layout1}>
        <div className={classes.head_deatils1}>
          <img
            alt="flight"
            src={head_icon}
            width="45"
            height="45"
            className={classes.head_icon1}
          />
          <h4 className={classes.head_title1}>
            {origin} to {destiantion}
          </h4>
          <p className={classes.head_date1}>
            {out.length + out1.length} flights found {heading[0]},{heading[2]}{" "}
            {heading[1]}
          </p>
        </div>
        <ul>
          {rowcompo}
          {multidisplay}
        </ul>
      </div>
    );
    let second = (
      <div className={classes.aircraft_layout2}>
        <div className={classes.head_deatils2}>
          <img
            alt="flight"
            src={head_icon}
            width="45"
            height="45"
            className={classes.head_icon2}
          />
          <h4 className={classes.head_title2}>
            {destiantion} to {origin}
          </h4>
          <p className={classes.head_date2}>
            {round.length + roundmultiple.length} flights found {heading1[0]},
            {heading1[2]} {heading1[1]}
          </p>
        </div>
        <ul>
          {rowcompo1}
          {multidisplay1}
        </ul>
      </div>
    );
    trip = (
      <div className={classes.aircraft}>
        {first} {second}
      </div>
    );
  }
  return <div className={classes.cover_layout}>{trip}</div>;
};

export default AircraftDeatils;
