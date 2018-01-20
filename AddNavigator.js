// manages workflow for adding new trips. Also contains the tabbed interface as
// the first screen in that workflow.

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen'
import ModeSelectorTabs from './ModeSelectorTabs'
import CostScreen from './CostScreen'

// keeps scanner from triggering when it's not on the screen
// kinda a hack but let's roll with it
global.scannerActive = false;
global.modeChooserActive = false;
global.moveToCostScreen = () => { return null };

const AddScreenNavigator = StackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ModeSelectorTabs: {
    screen: ModeSelectorTabs
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
          if(screenName == 'ModeSelectorTabs') {
            global.modeChooserActive = true;
          } else {
            global.modeChooserActive = false;
          }
        }}
      />
    );

  }

}
