// navigator containing the tabbed interfaces

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { TabNavigator } from 'react-navigation';

import TrophyScreen from './TrophyScreen'
import MapScreen from './MapScreen'
import CharityScreen from './CharityScreen'
import CreditCardScreen from './CreditCardScreen'

export default TabNavigator({
  TrophyScreen: {
    screen: TrophyScreen,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-trophy' : 'ios-trophy-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Trips',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-globe' : 'ios-globe-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  },
  CharityScreen: {
    screen: CharityScreen,
    navigationOptions: {
      tabBarLabel: 'Charities',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-book' : 'ios-book-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  },
  CreditCardScreen: {
    screen: CreditCardScreen,
    navigationOptions: {
      tabBarLabel: 'Credentials',
      tabBarIcon: ({tintColor,focused}) => (
        <Ionicons
          name={focused ? 'ios-card' : 'ios-card-outline'}
          size={26}
          style={{color:tintColor}}
        />
      ),
    },
  },
}, {
  lazy: true
});
