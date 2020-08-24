import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Input.module.css";
import Passenger from "../Passengers/Passengers";
import Select from "react-select";
const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "datepicker":
      inputElement = props.round ? (
        <div className={classes.date}>
          <DatePicker
            selected={props.value}
            onChange={props.changed}
            isClearable
            placeholderText="Select Date"
          />
        </div>
      ) : (
        <div className={classes.date}>
          <DatePicker
            selected={props.value}
            onChange={props.changed}
            isClearable
            placeholderText="Select Date"
            disabled
          />
        </div>
      );
      break;
    case "select":
      inputElement = (
        <Select
          onChange={props.changed}
          options={props.elementConfig.options}
          placeholder={props.elementConfig.placeholder}
        ></Select>
      );
      break;
    case "addpassenger":
      inputElement = props.open ? (
        <div className={classes.dropLayout}>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            style={props.style}
            onClick={props.clicked}
            readOnly
          />
          <div>
            {props.elementConfig.options.map((option) => (
              <Passenger
                key={option.value}
                value={option.displayValue}
                count={option.count}
                click={props.clicked}
              >
                {option.displayValue}
              </Passenger>
            ))}
            <button onClick={props.clicked} placeholder="Add Passengers">
              ADD
            </button>
          </div>
        </div>
      ) : (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          style={props.style}
          onClick={props.clicked}
          readOnly
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <div>
        <label className={classes.Label}>{props.label}</label>
      </div>
      {inputElement}
    </div>
  );
};

export default input;
