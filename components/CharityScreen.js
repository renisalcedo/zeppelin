// screen that tracks total contributions, social integration?

import React, { Component } from 'react';
import {
  Text, View, StyleSheet, AppRegistry, Image, ScrollView
} from 'react-native';

import Button from './Button';


export default class CharityScreen extends React.Component {

  state={
    value:''
  }
    constructor(props){
      super(props)
      this._onStateChange = this._onStateChange.bind(this)
    }

    _onStateChange(newState){
      const value= newState
    }

  render() {
    const {toggleText} = this.state;
    return (
      <ScrollView>
        <View style={styles.container1}>

          <Image
          style={{width: 50, height: 50, marginTop: 10}}
          source={{uri: 'https://www.givingwhatwecan.org/sites/givingwhatwecan.org/files/attachments/GWWC%20logo.jpg'}} />
          <Text style={styles.dark}>Giving what we can: Forming a community allows us to share information on how and where to give, help us stick to our commitment and
          stand together to create a culture of giving more, and more effectively.</Text>

          <Button onStateChange={this._onStateChange}/>

        </View>

        <View style={styles.container2}>
          <Image
            style={{width: 50, height: 50, marginTop: 10}}
            source={{uri: 'http://shortyawards.imgix.net/profile/images/349270/nature_org.png?auto=format&fit=crop&h=400&q=65&w=400&s=d78b2ab47d6675964a3bebe513a39e91'}} />
          <Text style={styles.dark}>Nature Conservancy: Protecting the lands and waters on which all life depends, the Nature Conservancy is the leading conservation
          organization working around the world and addresses the most pressing conservation threats at the largest scale.</Text>

          <Button onStateChange={this._onStateChange}/>

        </View>

        <View style={styles.container2}>
          <Image
            style={{width: 60, height: 80, marginTop: 10}}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/NRDC_bear_logo.svg/768px-NRDC_bear_logo.svg.png'}} />
          <Text style={styles.dark}>Natural Resources Defense Council works to safeguard the earth—its people, its plants and animals, the air we breathe, the water we drink,
          the natural systems on which all life depends, and the places we treasure.</Text>

          <Button onStateChange={this._onStateChange}/>

        </View>

        <View style={styles.container2}>
          <Image
            style={{width: 50, height: 50, marginTop: 10}}
            source={{uri: 'https://www.rainforest-alliance.org/business/sites/default/files/uploads/396/rainforest-alliance-certified-seal-lg.png'}} />
          <Text style={styles.dark}>Rainforest Alliance: We are an international non-profit organization working to build strong forests, healthy agricultural
          landscapes, and thriving communities through creative, pragmatic collaboration.</Text>

          <Button onStateChange={this._onStateChange}/>

        </View>

        <View style={styles.container2}>
          <Image
            style={{width: 146, height: 35, marginTop: 10}}
            source={{uri: 'https://s3.amazonaws.com/freebiesupply/large/2x/greenpeace-logo-png-transparent.png'}} />
          <Text style={styles.dark}>Greenpeace is a global, independent campaigning organization that uses peaceful protest and creative communication
          to expose global environmental problems and promote solutions that are essential to a green and peaceful future.</Text>

          <Button onStateChange={this._onStateChange}/>

        </View>
      </ScrollView>
    );
  }
}

const styles= StyleSheet.create({
  container1: {
    backgroundColor: '#67b0d9',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20
  },

  dark: {
    color:'#17202A',
    fontSize: 14,
    padding: 15
  },

  container2: {
    backgroundColor: '#67b0d9',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20
  },


})
