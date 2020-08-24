import React, { Component } from "react";
import airindia from "../../assets/connecting-flight.png";
import MultipleDisplay from "../MultipleDisplay/MultipleDisplay";
import { time } from "../../Utility/Utility";
import classes from "./MultipleDeatils.module.css";
class MultipleDetails extends Component {
  state = {
    details: false,
  };

  onclickHandeler = () => {
    this.setState({ details: !this.state.details });
  };
  render() {
    let intervalTime = time(
      this.props.data.x_departureTime,
      this.props.data.arrivalTime
    );
    let detail = "Show details";
    let row = null;
    if (this.props.data) {
      row = (
        <MultipleDisplay
          key={this.props.data.flightNo}
          data={this.props.data}
        />
      );
    }
    let display = (
      <li>
        <div className={classes.img_off}>
          <img src={airindia} width="50" height="50" alt="product" />
        </div>
        <div className={classes.craft_detail}>
          <h4>Multiple</h4>
          <p onClick={this.onclickHandeler}>
            <u>{detail}</u>
          </p>
        </div>
        <div className={classes.craft_depart}>
          <h4>{this.props.data.x_departureTime}</h4>
          <p>{this.props.data.x_origin}</p>
        </div>
        <div className={classes.craft_arrival}>
          <h4>{this.props.data.arrivalTime}</h4>
          <p>{this.props.data.destination}</p>
        </div>
        <div className={classes.craft_total_time}>
          <h4>
            {intervalTime[0]}h {intervalTime[1]}0m
          </h4>
          <p>Total duration</p>
        </div>
        <div className={classes.craft_total_price}>
          <h4>₹{this.props.data.price + this.props.data.x_price}</h4>
        </div>
        <div className={classes.craft_book}>
          <div className={classes.cart}>Book</div>
        </div>
      </li>
    );
    if (this.state.details) {
      detail = "Hide details";
      display = (
        <div>
          <li>
            <div className={classes.img_off}>
              <img src={airindia} width="50" height="50" alt="product" />
            </div>
            <div className={classes.craft_detail}>
              <h4>Multiple</h4>
              <p onClick={this.onclickHandeler}>
                <u>{detail}</u>
              </p>
            </div>
            <div className={classes.craft_depart}>
              <h4>{this.props.data.x_departureTime}</h4>
              <p>{this.props.data.origin}</p>
            </div>
            <div className={classes.craft_arrival}>
              <h4>{this.props.data.arrivalTime}</h4>
              <p>{this.props.data.destination}</p>
            </div>
            <div className={classes.craft_total_time}>
              <h4>
                {intervalTime[0]}h {intervalTime[1]}0m
              </h4>
              <p>Non stop</p>
            </div>
            <div className={classes.craft_total_price}>
              <h4>₹{this.props.data.price}</h4>
            </div>
            <div className={classes.craft_book}>
              <div className={classes.cart}>Book</div>
            </div>
          </li>
          <ul>{row}</ul>
        </div>
      );
    }
    return <div>{display}</div>;
  }
}

export default MultipleDetails;
