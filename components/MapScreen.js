import { AsyncStorage } from 'react-native';
import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { MapView } from 'expo';

import {Geodesic} from './Geodesic';

require('./Palette.js');

global.resetFunction = ()=>{};

export default class App extends React.Component {

  state = {
    flights : []
  }

  getFlights() {
    console.log("UPDATING MAP SCREEN");
    AsyncStorage.getItem('flights').then(JSON.parse).then((value)=>{
      this.setState({
        flights: value
      });
      this.render();
    });
  }

  componentWillMount(){
    this.getFlights();
    global.resetFunction = this.getFlights.bind(this);
  }

  // async getFlights() {
  // }

  // getFlights() {
  //   AsyncStorage.getItem('flights').then((value)=>{
  //
  //   }).catch(function () {
  //     console.log("Promise Rejected");
  //   });
  // }


  render() {

    let flights = this.state.flights;

    let color = [
      global.palette[0],
      global.palette[2],
      global.palette[4]
    ];


    if(flights != null && flights.length > 0) {

      console.log("HERE");
      console.log(flights);



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
                  console.log(name.depart.lat,name.depart.lon,name.arrive.lat,name.arrive.lon);
                  let geo = Geodesic(parseFloat(name.depart.lat),parseFloat(name.depart.lon),parseFloat(name.arrive.lat),parseFloat(name.arrive.lon));
                  console.log(geo);
                  return   <View key={index+'c'}>
                            <MapView.Polyline
                              coordinates={geo}
                              strokeColor={color[index % color.length]}
                              strokeWidth={2.5}
                              geodesic={true}
                              lineDashPattern={[10,7]}
                              key = {index}
                            />
                            <MapView.Marker key={index+'a'} coordinate={{ latitude: parseFloat(name.depart.lat), longitude: parseFloat(name.depart.lon)}} pinColor='#336' title={name.code}/>
                            <MapView.Marker key={index+'b'} coordinate={{ latitude: parseFloat(name.arrive.lat), longitude: parseFloat(name.arrive.lon) }} pinColor='#336' title={name.code}/>
                          </View>
                })

              }
            </MapView>
        </View>
      );






    } else {





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

            </MapView>
        </View>
      );



    }
  }


}
