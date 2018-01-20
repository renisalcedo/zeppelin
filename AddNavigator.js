// manages workflow for adding new trips. Also contains the tabbed interface as
// the first screen in that workflow.

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen'
import AddScreen from './AddScreen'
import CostScreen from './CostScreen'

// keeps scanner from triggering when it's not on the screen
// kinda a hack but let's roll with it
global.scannerActive = false;

const AddScreenNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  AddScreen: {
    screen: AddScreen
  },
  CostScreen: {
    screen: CostScreen
  }
})

export default class AddNavigator extends Component {

  render() {

    return (
      <AddScreenNavigator
        onNavigationStateChange={(prevState, currentState) => {
          let screenName = currentState.routes[currentState.routes.length-1]['routeName'];
          console.log(screenName);
          if(screenName == 'AddScreen') {
            global.scannerActive = true;
          } else {
            global.scannerActive = false;
          }
        }}
      />
    );

  }

}
