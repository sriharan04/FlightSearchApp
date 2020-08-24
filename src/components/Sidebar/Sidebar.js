import React from "react";
import classes from "./Sidebar.module.css";
import BookingDeatils from "../BookingDetails/BookingDetails";
const Sidebar = (props) => {
  return (
    <div className={classes.sb_header_layout}>
      <div>
        <BookingDeatils />
      </div>
    </div>
  );
};

export default Sidebar;
