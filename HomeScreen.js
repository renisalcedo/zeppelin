// Screen seen at start of app

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Tabs from './Tabs'
import AddScreen from './AddScreen'


export default class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <View style={{flex:1}}>
        <View style={{width: 5, height: 8,}}></View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={params.addScreen ? params.addScreen : () => null}>
            <Ionicons
              name={'ios-map-outline'}
              size={26}
              style={{color:'#397CF2'}} />
          </TouchableOpacity>
          <View style={{width: 17, height: 20, opacity: 0}} />
        </View>
      </View>
    );
    return { title: "Welcome", headerRight };
  };

  addScreen = () => {
    this.props.navigation.navigate("AddScreen",{screen: AddScreen});
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ addScreen: this.addScreen });
  }

  render() {
    return (
      <Tabs />
    );
  }
}
