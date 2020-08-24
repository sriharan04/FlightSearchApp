import React from "react";
import classes from "./Header.module.css";
const header = () => {
  return (
    <div className={classes.header_layout}>
      <h2 className={classes.title}>Flight Search App</h2>
    </div>
  );
};

export default header;
