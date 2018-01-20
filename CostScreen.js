// Screen reporting cost in dollars to offset, along with details of flight

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class CostScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Total Amount Paid`,
    }
  };

  render() {

    const { state, navigate } = this.props.navigation;

    let params = this.props.navigation.state.params;
    let cost = params.cost;
    let arrive = params.trip.arrive;
    let depart = params.trip.depart;

    return (
      <View>
        <Text>Cost: ${cost}</Text>
        <Text>From: {depart.name}</Text>
        <Text>Lat: {depart.lat}</Text>
        <Text>Lon: {depart.lon}</Text>
        <Text>To: {arrive.name}</Text>
        <Text>Lat: {arrive.lat}</Text>
        <Text>Lon: {arrive.lon}</Text>
      </View>
    );
  }

}
