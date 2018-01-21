import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { RkButton, RkTextInput, RkText } from 'react-native-ui-kitten';
import { Icon, Button } from 'react-native-elements'
// import { Autocomplete } from 'react-native-autocomplete-input';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';
  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import CarbonConverter from './CarbonConverter'
import SuccessScreen from './SuccessScreen'

require('./Palette.js');

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class AddScreenCar extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Car Trip`,
    }
  };


  state = {
    coords : '',
    from : '',
    to : '',
    donate: null,
    carbon: null,
    location: { coords: {latitude: 0, longitude: 0}},
    allLats: [],
    allLongs: [],
    trip: [],
    active: false
  };

  dollarCallback = () => {
    global.moveToSuccessScreen(this.state.trip,this.state.donate,this.state.carbon,'car');
  }

  componentWillMount() {
    this.setState({
      active: true
    });
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  componentWillUnmount() {
    this.setState({
      active: false
    });
  }

  locationChanged = (location) => {
    if(!this.state.active) {
      region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
      },
      this.setState({location, region})
    }
  }




  onButtonPressSearchDirections() {
    const mode = 'driving'; // 'walking';
    const origin = this.state.from;
    const destination = this.state.to;
    if(origin == '' || destination == '') {
      return;
    }
    const APIKEY = 'AIzaSyCGBiv58zM5ElIejqsHz5yB8K_qIsfwUc0';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.routes.length) {
                this.setState({
                    coords: this.decodeGoogleDirections(responseJson.routes[0].overview_polyline.points) // definition below
                });
                this.setState({
                    donate: String(this.carOffsetDonationCalculation(responseJson.routes[0].legs[0].distance.value))
                });
            }
            this.setMapViewWithResults();
        }).catch(e => {console.warn(e)});

  }

  decodeGoogleDirections(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
// transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  carOffsetDonationCalculation(distance) {
    this.setState({
      carbon: distance * .000001201
    });
    cost = (this.state.carbon * 1.34).toFixed(2);
    if (cost < 0.30) {
      return (0.30).toFixed(2);
    }
    return cost;
  }

  renderAmount() {
    if (this.state.donate) {
      return (
        'Donate $' + String(this.state.donate)
      );
    } else {
      return (
        "Please input itinerary"
      );
    }
  }

  setMapViewWithResults() {
    let saveCoords = []
    for (var coord in this.state.coords) {
      this.state.allLats.push(this.state.coords[coord].latitude);
      this.state.allLongs.push(this.state.coords[coord].longitude);
      saveCoords.push(this.state.coords[coord]);
    }

    maxLat = Math.max(...this.state.allLats);
    minLat = Math.min(...this.state.allLats);
    maxLong = Math.max(...this.state.allLongs);
    minLong = Math.min(...this.state.allLongs);
    avgLat = (maxLat + minLat)/2
    avgLong = (maxLong + minLong)/2
    newDeltaLat = 1.1 * Math.abs(maxLat-minLat);
    newDeltaLong = 1.1 * Math.abs(maxLong-minLong);
    newRegion = {
          latitude: avgLat,
          longitude: avgLong,
          latitudeDelta: newDeltaLat,
          longitudeDelta: newDeltaLong,
        };
    this.setState({region : newRegion, trip: saveCoords});
  }

  render() {
    return (
       <View style={styles.container}>


       <MapView
         style = {styles.map}
         showsUserLocation={true}
         region = {this.state.region}
       >
         <MapView.Polyline
           coordinates={[...this.state.coords]}
           strokeWidth={2}
           fillColor='#B6E8EF'
           stroke='#B6E8EF'
         />
       </MapView>


        <View style={[styles.entryView,{height:50}]}>
          <View style={{flex:1}}>
            <Button title={this.state.from} style={styles.button} borderRadius={2} backgroundColor={global.palette[3]} icon={{name: 'crosshairs-gps', type: 'material-community'}} onPress={() => {
                this.popupDialogFrom.show();
              }}
            > To {this.state.to} </Button>
            <PopupDialog
              ref={(popupDialog) => { this.popupDialogFrom = popupDialog; }}
            >
              <GooglePlacesAutocomplete
                 styles={{
                   listView: {
                     backgroundColor: 'white'
                   }
                 }}
                 placeholder='Search'
                 minLength={2} // minimum length of text to search
                 onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState({from:String(data.description)});
                   console.log(details);
                   this.popupDialogFrom.dismiss();
                 }}
                 query={{
                   // available options: https://developers.google.com/places/web-service/autocomplete
                   key: 'AIzaSyCGBiv58zM5ElIejqsHz5yB8K_qIsfwUc0',
                   language: 'en', // language of the results
                 }}
                 nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

                 GooglePlacesSearchQuery={{
                   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                   rankby: 'distance',
                 }}
               />
            </PopupDialog>

            <Button title={this.state.to} style={styles.button} borderRadius={2} backgroundColor={global.palette[3]} icon={{name: 'map-marker', type: 'material-community'}} onPress={() => {
                this.popupDialogTo.show();
              }}/>
              <PopupDialog
              ref={(popupDialog) => { this.popupDialogTo = popupDialog; }}
            >
              <GooglePlacesAutocomplete
                 styles={{
                   listView: {
                     backgroundColor: 'white'
                   }
                 }}
                 placeholder='Search'
                 minLength={2} // minimum length of text to search
                 onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState({to:String(data.description)});
                   console.log(details);
                   this.popupDialogTo.dismiss();
                 }}
                 query={{
                   // available options: https://developers.google.com/places/web-service/autocomplete
                   key: 'AIzaSyCGBiv58zM5ElIejqsHz5yB8K_qIsfwUc0',
                   language: 'en', // language of the results
                 }}
                 nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

                 GooglePlacesSearchQuery={{
                   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                   rankby: 'distance',
                 }}
               />
            </PopupDialog>
          </View>

          <Button
            style={[styles.button,styles.bottomButtonCalculate]}
            backgroundColor={ this.state.trip.length > 0 ? global.palette[2] : global.palette[3]}
            borderRadius={2} icon={{name: 'checkbox-marked-circle-outline', type: 'material-community'}}
            title={ this.state.trip.length > 0 ? `Offset Trip: Donate $${this.state.donate}` : "Calculate Carbon Emissions"}
            onPress={ this.state.trip.length > 0 ? this.dollarCallback.bind(this) : this.onButtonPressSearchDirections.bind(this)}
          />


        </View>
        </View>

    );
  }
}

// <Button style={styles.bottomButtonDonate} title={this.state.donate} backgroundColor='#D8EBFF' icon={{name: 'currency-usd', type: 'material-community'}} onPress={this.dollarCallback}/>


const styles = StyleSheet.create({
  bottomButtonCalculate: {
    marginBottom: 10,
    width:'80%'
  },
  bottomButtonDonate: {
    position: 'absolute',
    top: 200,
  },
  entryView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    // marginTop: 20,
    width: '100%',
    // height: '100%',
  },
  button : {
    marginTop: 10,
    shadowRadius: 3,
    shadowOffset: {width: 1,height: 1},
    shadowOpacity: 100,
    // height: 40
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },




  container: {
    // paddingTop: 15,
    // paddingLeft: 10,
    // paddingRight: 10,
    flex: 1,
    alignItems: 'center',
  }
  // donateButton: {
  //   backgroundColor: 'green',
  //   flex: 1,
  //   height: 20
  // },


});

//            <SvgUri width="50" height="50" source={require('./SVG/004-camera-automatic-mode.svg')} />



// <View
//   style={styles.buttonView}>
//   <RkButton
//     style={{backgroundColor: 'red'}}
//     contentStyle={{color: 'white'}}>Hello</RkButton>
//   <RkButton
//       style={{backgroundColor: 'red'}}
//       contentStyle={{color: 'white'}}>Hi</RkButton>
// </View>
//
// <RkButton
//   style={styles.button}
//   onPress={this.onButtonPressSearchDirections.bind(this)}
// >
//   Search
// </RkButton>
//
//
// <RkButton
//   style={styles.donateButton}
// >
//   {this.renderAmount()}
// </RkButton>
