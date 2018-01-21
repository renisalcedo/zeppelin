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
import SuccessScreen from './SuccessScreen'

// keeps scanner from triggering when it's not on the screen
// kinda a hack but let's roll with it
global.scannerActive = false;
global.modeChooserActive = false;
global.moveToCostScreen = () => { return null };
global.moveToSuccessScreen = () => { return null };

require('./Palette.js');

const titleColor = '#1e2127';//global.palette[5]

const AddScreenNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        title: 'Zeppelin',
        headerTintColor: titleColor,
      })
    },
    ModeSelectorTabs: {
      screen: ModeSelectorTabs,
      navigationOptions: ({ navigation, screenProps }) => ({
        title: 'Select Travel',
        headerTintColor: titleColor,
      })
    },
    CostScreen: {
      screen: CostScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        headerTintColor: titleColor,
      })
    },
    SuccessScreen: {
      screen: SuccessScreen
    }
  });



  const defaultGetStateForAction = AddScreenNavigator.router.getStateForAction;
  AddScreenNavigator.router.getStateForAction = (action, state) => {
      if (state && action.type === 'GoToRoute') {
          let index = state.routes.findIndex((item) => {
              return item.routeName === action.routeName
          });
          const routes = state.routes.slice(0, index+1);
          return {
              routes,
              index
          };
      }
      return defaultGetStateForAction(action, state);
  };





export default class AddNavigator extends Component {

  render() {

    return (
      <AddScreenNavigator
        onNavigationStateChange={(prevState, currentState) => {
          // console.log(currentState);
          let screenName = currentState.routes[currentState.routes.length-1]['routeName'];
          if(screenName == 'ModeSelectorTabs') {
            global.modeChooserActive = true;
          } else {
            global.modeChooserActive = false;
          }
          console.log("Chooser: "+global.modeChooserActive);
        }}
      />
    );

  }

}
