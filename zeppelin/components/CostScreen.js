// Screen reporting cost in dollars to offset, along with details of flight

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { MapView } from 'expo';

import {Geodesic} from './Geodesic';

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

    let x1 = parseFloat(depart.lat);
    let y1 = parseFloat(depart.lon);
    let x2 = parseFloat(arrive.lat);
    let y2 = parseFloat(arrive.lon);

    return (
      <View style={{flex:1}}>
        <View style={{flex: 1}}>
          <Text>From: {depart.name}</Text>
          <Text>To: {arrive.name}</Text>
          <Text>Cost: ${cost}</Text>
        </View>
        <View style={{flex:4}}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: (x1+x2)/2,
              longitude: (y1+y2)/2,
              latitudeDelta: 1.2*Math.abs(x1-x2),
              longitudeDelta: 1.2*Math.abs(y1-y2),
            }}>
            <MapView.Polyline
              coordinates={Geodesic(x1,y1,x2,y2)}
              strokeColor="#33F" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={3}
              geodesic={true} />

            </MapView>
        </View>
      </View>
    );
  }

}
