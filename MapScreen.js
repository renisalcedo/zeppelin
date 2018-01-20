import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { MapView } from 'expo';

import {Geodesic} from './Geodesic';

export default class App extends React.Component {



  getFlights() {
    return [
      {
        arr: {
          lat: 40,
          lon: -73
        },
        dep: {
          lat: 34,
          lon: -118
        },
      },
      {
        arr: {
          lat: 40,
          lon: -73
        },
        dep: {
          lat: 49,
          lon: 2
        },
      },
      {
        arr: {
          lat: 10,
          lon: 20
        },
        dep: {
          lat: 9,
          lon: -83
        },
      },
      {
        arr: {
          lat: 40,
          lon: -75
        },
        dep: {
          lat: 55,
          lon: 38
        },
      }
    ]
  }


  render() {

    let flights = this.getFlights();

    let color = [
      "#F00",
      "#0F0",
      "#00F",
      "#FF0",
      "#F0F",
      "#0FF",
      "#FFF",
      "#000",
    ]

    return (
      <View style={{flex:4}}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 0,
            longitude: -30,
            latitudeDelta: 90,
            longitudeDelta: 180,
          }}>
            {
              flights.map( (name, index, flights) => {
                console.log(name,index);
                let geo = Geodesic(name.dep.lat,name.dep.lon,name.arr.lat,name.arr.lon);
                return   <MapView.Polyline
                            coordinates={geo}
                            strokeColor={color[index % color.length]}
                            strokeWidth={3}
                            geodesic={true}
                            key = {index}
                          />
              })

            }
          </MapView>
      </View>
    );
  }


}
