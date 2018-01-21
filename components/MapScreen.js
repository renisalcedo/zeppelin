import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { MapView } from 'expo';

import {Geodesic} from './Geodesic';

require('./Palette.js');

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
      global.palette[0],
      global.palette[2],
      global.palette[4]
    ];

    return (
      <View style={{flex:4}}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 30,
            longitude: -30,
            latitudeDelta: 90,
            longitudeDelta: 180,
          }}>
            {
              flights.map( (name, index, flights) => {
                let geo = Geodesic(name.dep.lat,name.dep.lon,name.arr.lat,name.arr.lon);
                return   <View key={index+'c'}>
                          <MapView.Polyline
                            coordinates={geo}
                            strokeColor={color[index % color.length]}
                            strokeWidth={2.5}
                            geodesic={true}
                            lineDashPattern={[10,7]}
                            key = {index}
                          />
                          <MapView.Marker key={index+'a'} coordinate={{ latitude: name.dep.lat, longitude: name.dep.lon}} pinColor='#336' title={name.code}/>
                          <MapView.Marker key={index+'b'} coordinate={{ latitude: name.arr.lat, longitude: name.arr.lon }} pinColor='#336' title={name.code}/>
                        </View>
              })

            }
          </MapView>
      </View>
    );
  }


}
