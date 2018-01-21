// conversion module for acquiring trip from user and returning trip details
// with carbon cost converted to dollars. looks up airport data in JSON file
// and calculates distance

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import getDistance from 'geolib';

import BoardingPassScanner from './BoardingPassScanner'


var airportCodes = require('./utils/airports.json');

export default class CarbonConverter extends React.Component {

  constructor(props) {
    super(props);

    // generate map from JSON file of airport data
    let airportCodeMap = new Map();
    for(var i = 0; i < airportCodes.length; i++) {
      airportCodeMap.set(airportCodes[i]['iata'],airportCodes[i]);
    }
    this.state = {
      airportCodeMap: airportCodeMap
    }

    this.scannerCallback = this.scannerCallback.bind(this);

  }

  // state = {
  //   airportMap: null
  // }
  scannerCallback = (depart,arrive) => {
    // alert("scannerCallback");
    let trip = this.getAirportData(depart,arrive);
    // console.log(trip);
    let cost = this.calculate(trip.arrive['lat'],trip.arrive['lon'],trip.depart['lat'],trip.depart['lon']);
    this.props.callbackFromParent(trip,cost,(cost -.3)/15*1016.05);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 4 }}>
          <BoardingPassScanner callbackFromParent={this.scannerCallback}/>
        </View>
      </View>
    );
  }

  getAirportData = (depart, arrive) => {
    let departData = this.state.airportCodeMap.get(depart);
    let arriveData = this.state.airportCodeMap.get(arrive);
    if(departData === undefined || arriveData === undefined) {
      console.log("could not locate airport");
      return null;
    } else {
      return ({
        depart: {
          name: departData["name"],
          lat: departData["lat"],
          lon: departData["lon"],
          code: depart
        },
        arrive: {
          name: arriveData["name"],
          lat: arriveData["lat"],
          lon: arriveData["lon"],
          code: arrive
        }
      });
    }
  }

  calculate(lat1, long1, lat2, long2) {
    distance = (geolib.getDistance(
      {latitude: lat1, longitude: long1},
      {latitude: lat2, longitude: long2}
    ))/ 1000;
    tonnage = (0.0612 * distance + 43.6)/1016.05
    offset = (tonnage * 15+.3).toFixed(2);
    return offset;
  }



}

CarbonConverter.propTypes = {
  callbackFromParent: PropTypes.func
};
