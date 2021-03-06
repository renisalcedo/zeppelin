// Screen seen at start of app

import { AsyncStorage } from 'react-native';

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Tabs from './Tabs'
import AddScreen from './AddScreen'

require('./Palette.js');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    global.moveToCostScreen = (trip, cost, carbon) => { this.arriveAtCostScreen(trip,cost,carbon)};
    global.moveToSuccessScreen = (trip, cost, carbon) => { this.arriveAtSuccessScreen(trip,cost,carbon)};

  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <TouchableOpacity onPress={params.addScreen ? params.addScreen : () => null}>
      <View style={{flex:1}}>
        <View style={{width: 5, height: 8,}}></View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              name={'md-add'}
              size={26}
              style={{color:global.palette[1]}} />
          <View style={{width: 17, height: 20, opacity: 0}} />
        </View>
      </View>
      </TouchableOpacity>
    );
    let headerLeft = (
      <TouchableOpacity onPress={()=>{AsyncStorage.setItem('flights', ''); global.resetFunction();}}>
      <View style={{flex:1}}>
        <View style={{width: 5, height: 8,}}></View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 17, height: 20, opacity: 0}} />
            <Ionicons
              name={'ios-trash-outline'}
              size={26}
              style={{color:global.palette[1]}} />
        </View>
      </View>
      </TouchableOpacity>
    );
    return { headerLeft,headerRight };
  };

  addScreen = () => {
    this.props.navigation.navigate("ModeSelectorTabs",{screen: AddScreen});
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ addScreen: this.addScreen });
  }

  arriveAtCostScreen(trip, cost, carbon) {
    this.props.navigation.navigate("CostScreen",{trip: trip, cost: cost, carbon: carbon});
  }

  arriveAtSuccessScreen(trip, cost, carbon) {
    this.props.navigation.navigate("SuccessScreen",{trip: trip, cost: cost, carbon: carbon, mode: 'car'});
  }

  render() {
    return (
      <Tabs />
    );
  }
}
