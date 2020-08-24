import React from "react";
import classes from "./Passesngers.module.css";
const passenger = (props) => {
  return (
    <div className={classes.layout}>
      <div className={classes.adult} onClick={props.click}>
        <p>{props.value}</p>
        <div className={classes.plus}>+</div>
        <p>{props.count}</p>
        <div className={classes.minus} disabled={true}>
          -
        </div>
      </div>
    </div>
  );
};

export default passenger;
