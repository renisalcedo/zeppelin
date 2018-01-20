// screen for scanning boarding pass

import React, { Component } from 'react';

import CarbonConverter from './CarbonConverter'
import CostScreen from './CostScreen'

export default class AddScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Scan Boarding Pass`,
    }
  };

  componentDidUpdate() {
    console.log(this.props.navigation);
  }

  render() {

    const { state, navigate } = this.props.navigation;

    return (
      <CarbonConverter callbackFromParent={this.dollarCallback}/>
    );
  }

  dollarCallback = (trip,cost,carbon) => {
    // console.log(global.moveToCostScreen);
    global.moveToCostScreen(trip,cost,carbon);
  }

};
