// Screen reporting cost in dollars to offset, along with details of flight

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { MapView } from 'expo';

import {Geodesic} from './Geodesic';

require('./Palette.js');

const styles = StyleSheet.create({
  airport: {
    fontSize: 40,
    fontWeight: '400',
    color: global.palette[3]
  },
  // header: {
  //   flex: 2,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: global.palette[1]
  // },
  donateButton: {
    backgroundColor: global.palette[3],
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default class CostScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {

    let arrive = navigation.state.params.trip.arrive.code;
    let depart = navigation.state.params.trip.depart.code;

    return {
      title: depart+" -> "+arrive,
      headerMode: 'screen',
      headerVisible: false
    };
  };

  finishTransaction() {
    this.props.navigation.navigate("SuccessScreen",{
       cost: this.props.navigation.state.params.cost,
       carbon: this.props.navigation.state.params.carbon,
       mode: 'plane'
     });
  }

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

    // <View style={styles.header}>
    //   <Text style={styles.airport}>{depart.code} -> {arrive.code}</Text>
    // </View>

    return (
      <View style={{flex:1}}>
        <View style={{flex:16}}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: (x1+x2)/2,
              longitude: (y1+y2)/2,
              latitudeDelta: 1.5*Math.abs(x1-x2),
              longitudeDelta: 1.5*Math.abs(y1-y2),
            }}>
            <MapView.Polyline
              coordinates={Geodesic(x1,y1,x2,y2)}
              strokeColor={global.palette[5]} // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={3}
              geodesic={true}
              lineDashPattern={[10,7]}
              />
            <MapView.Marker coordinate={{ latitude: x1, longitude: y1}} pinColor='#357A51' title={depart.code}/>
            <MapView.Marker coordinate={{ latitude: x2, longitude: y2 }} pinColor='#961616' title={arrive.code}/>

          </MapView>
        </View>
        <View style={{flex: 2, backgroundColor: 'white', opacity: 1}}>
          <TouchableOpacity style={styles.donateButton} onPress={this.finishTransaction.bind(this)}>
            <Text style={{fontSize: 30}}>{'Offset for $'+cost}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
