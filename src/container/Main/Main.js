import React, { Component } from "react";
import classes from "./Main.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import RoundTrip from "../../components/RounTripDetails/RountTripDetails";
import Aircraft from "../../components/AirCraftsDeatils/AirCraftDeatils";
import { Route, Switch } from "react-router-dom";
import Empty from "../../components/Empty/Empty";
class Main extends Component {
  state = {
    flightData: [
    ],
  };

  async componentDidMount() {
    const response = await fetch(
      "https://tw-frontenders.firebaseio.com/advFlightSearch.json"
    );
    const json = await response.json();
    this.setState({ flightData: json });
  }

  render() {
    return (
      <div className={classes.main_layout}>
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={() => <Empty />} />
          <Route
            path="/oneway"
            component={() => <Aircraft details={this.state.flightData} />}
          />
          <Route
            path="/RoundTrip"
            component={() => <RoundTrip data={this.state.flightData} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
