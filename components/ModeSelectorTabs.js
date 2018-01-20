// navigator containing the tabbed interfaces

import React, { Component } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { TabNavigator } from 'react-navigation';

import AddScreen from './AddScreen'
import AddScreenCar from './AddScreenCar'

const ChooseNavigator = TabNavigator({
  AddScreenCar: {
    screen: AddScreenCar,
    navigationOptions: {
      tabBarLabel: 'Car',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-car' : 'ios-car-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  },
  AddScreen: {
    screen: AddScreen,
    navigationOptions: {
      tabBarLabel: 'Plane',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-plane' : 'ios-plane-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  }
});


export default class ModeSelectorTabs extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Select Mode of Transit`,
    }
  };

  render() {

    return (
      <ChooseNavigator
        onNavigationStateChange={(prevState, currentState) => {
          let screenName = currentState.routes[currentState.index]['routeName'];
          if(screenName == 'AddScreen') {
            global.scannerActive = true;
          } else {
            global.scannerActive = false;
          }
          console.log("Scanner: "+global.scannerActive);
        }}
      />
    );

  }

}
