import React, { Component } from "react";
import classes from "./BookingDetails.module.css";
import Input from "../../components/Input/Input";
import Btn from "../../components/Button/Button";
import { Link } from "react-router-dom";

class BookingDetails extends Component {
  state = {
    flightData: [],
    orderForm: {
      origin: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              label: "Pune (PNQ)",
              value: "Pune (PNQ)",
            },
            {
              label: "Mumabi (BOM)",
              value: "Mumbai (BOM)",
            },
            {
              label: "Bengaluru (BLR)",
              value: "Bengaluru (BLR)",
            },
            {
              label: "Delhi (DEL)",
              value: "Delhi (DEL)",
            },
          ],
          placeholder: "Enter Origin City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: true,
      },
      destination: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              label: "Pune (PNQ)",
              value: "Pune (PNQ)",
            },
            {
              label: "Mumabi (BOM)",
              value: "Mumbai (BOM)",
            },
            {
              label: "Bengaluru (BLR)",
              value: "Bengaluru (BLR)",
            },
            {
              label: "Delhi (DEL)",
              value: "Delhi (DEL)",
            },
          ],
          placeholder: "Enter Destination City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: true,
      },
      departure: {
        elementType: "datepicker",
        elementConfig: {
          placeholder: "Departure Date",
        },
        value: "",
        round: true,
        validation: {
          required: true,
        },
        valid: true,
      },
      Return: {
        elementType: "datepicker",
        elementConfig: {
          placeholder: "Return Date",
        },
        value: "",
        validation: {},
        round: false,
        valid: true,
      },
      Passesger: {
        elementType: "addpassenger",
        elementConfig: {
          options: [
            { value: "Adult", displayValue: "Adult (A)", count: 0, val: "A" },
            {
              value: "Child",
              displayValue: "Children (C)",
              count: 0,
              val: "C",
            },
            { value: "Infan", displayValue: "Infants (I)", count: 0, val: "I" },
          ],
          placeholder: "Add Passengers",
        },
        open: false,
        value: "Select Passengers",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    activeTab: true,
    paths: "/oneway",
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value !== "" && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    if (!inputIdentifier) {
      inputIdentifier = event.Id;
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    if (inputIdentifier === "departure" || inputIdentifier === "Return")
      updatedFormElement.value = event;
    if (inputIdentifier === "origin" || inputIdentifier === "destination")
      updatedFormElement.value = event.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };
  onaddpassenger = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    let val = e.target.textContent;
    let placeholder = e.target.placeholder;
    let parent = e.target.parentNode.textContent;
    let option = parent.slice(0, 5);
    if (placeholder === "Add Passengers" || val === "ADD") {
      updatedFormElement.open = !updatedFormElement.open;
      let count = "";
      updatedFormElement.elementConfig.options.map((elm) => {
        count += elm.val + "" + elm.count + "  ";
        return count;
      });
      updatedFormElement.value = count;
    }
    if (option === "Adult" || option === "Child" || option === "Infan") {
      updatedFormElement.elementConfig.options.map((elm) => {
        if (elm.value === option && val === "+") {
          elm.count += 1;
        }
        if (elm.value === option && val === "-" && elm.count > 0) {
          elm.count -= 1;
        }
        return null;
      });
    }

    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
  };
  onclickHandler = (e) => {
    let val = String(e.target.textContent);
    val !== "One Way"
      ? this.setState({ activeTab: false, paths: "/roundtrip" })
      : this.setState({ activeTab: true, paths: "/oneway" });
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm["Return"],
    };
    if (val !== "One Way") {
      updatedFormElement.round = true;
    } else {
      updatedFormElement.round = false;
    }
    updatedOrderForm["Return"] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };
  onrouteHandeler = () => {};
  componentDidMount() {}
  render() {
    let oneway = classes.form_header_active;
    let round = classes.form_header_inactive;
    if (!this.state.activeTab) {
      oneway = classes.form_header_inactive;
      round = classes.form_header_active;
    }
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let link = "Search";
    if (
      this.state.orderForm.origin.value !== "" &&
      this.state.orderForm.destination.value !== "" &&
      this.state.orderForm.departure.value !== ""
    ) {
      if (this.state.activeTab) {
        link = (
          <Link disabled to={{ pathname: this.state.paths, state: this.state }}>
            Search
          </Link>
        );
      }
      if (!this.state.activeTab && this.state.orderForm.Return.value !== "") {
        link = (
          <Link
            disabled
            className={classes.link}
            to={{ pathname: this.state.paths, state: this.state }}
          >
            Search
          </Link>
        );
      }
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <div
            key={formElement.config.elementConfig.placeholder}
            className={classes.input_container}
          >
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              label={formElement.config.elementConfig.placeholder}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              open={formElement.config.open}
              active={formElement.activeTab}
              round={formElement.config.round}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              clicked={(e) => this.onaddpassenger(e, formElement.id)}
            />
          </div>
        ))}
        <Btn disabled={!this.state.formIsValid} onClick={this.onrouteHandeler}>
          {link}
        </Btn>
      </form>
    );
    return (
      <div className={classes.form_structure}>
        <div className={classes.form}>
          <div
            className={classes.form_header}
            onClick={(e) => this.onclickHandler(e)}
          >
            <a className={oneway} href="/#">One Way</a>
            <a className={round} href="/#">Return</a>
          </div>
          {form}
        </div>
      </div>
    );
  }
}
export default BookingDetails;
