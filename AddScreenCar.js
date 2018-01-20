// screen for scanning boarding pass

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import CarbonConverter from './CarbonConverter'
import CostScreen from './CostScreen'

export default class AddScreenCar extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Car Trip`,
    }
  };

  render() {
    return (

      <View><Text>Car Trip</Text></View>

    );
  }

};
