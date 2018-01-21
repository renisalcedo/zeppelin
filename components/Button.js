import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity
} from 'react-native';


export default class Button extends Component {
  state={
    toggle:true
  }

  _onPress(){
    const newState = !this.state.toggle;
    this.setState({toggle:newState})
    this.props.onStateChange  && this.props.onStateChange(newState)
  }

  render(){
    const {toggle} = this.state;
    const textValue = toggle?"Donate Here":"Thank you for donating!";
    const buttonBg = toggle?"green":'lightgreen';
    const textColor = toggle?"white":'black';
    return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
          onPress={()=>this._onPress()}
          style={{margin: 15,
            flex: 1,
            height: 50,
            backgroundColor:buttonBg,
            justifyContent:'center',
            borderRadius: 10,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 8,
            shadowOpacity: 0.20
            }}>
            <Text style={{color: textColor, textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
              {textValue}
            </Text>
          </TouchableOpacity>
        </View>
    )
  }
}
