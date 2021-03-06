import React, { Component } from "react";
import FlockList from "../components/FlockList";
import NewFlockInput from "../components/NewFlockInput";
import HomePageContainer from "./HomePageContainer";
import ShowFlock from "../components/ShowFlock";
import { connect } from "react-redux";
import fetchFlocks from "../actions/fetchFlocks";
import fetchBundles from "../actions/fetchBundles";
import ShowBundle from "../components/ShowBundle";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../stylesheets/bundleStyles.css";
import HomePage from "../components/HomePage";
class FlocksContainer extends Component {
  componentDidMount() {
    console.log(fetchFlocks());
    this.props.fetchFlocks();
    // this.props.fetchBundles();
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Switch>
          <Route path="/flocks/new" component={NewFlockInput} />
          <Route
            path="/flocks/:id"
            render={(routerProps) => (
              <ShowFlock
                {...routerProps}
                flocks={this.props.flocks}
                egg_bundles={this.props.egg_bundles}
              />
            )}
          />
          <Route
            exact
            path="/flocks"
            render={(routerProps) => (
              <FlockList {...routerProps} flocks={this.props.flocks} />
            )}
          />
          <Route
            exact
            path="/egg_bundles"
            component={HomePageContainer}
            egg_bundles={this.props.egg_bundles}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    flocks: state.flocks,
  };
};

export default connect(mapStateToProps, { fetchFlocks })(FlocksContainer);
