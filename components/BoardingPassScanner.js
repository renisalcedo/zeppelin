// Wrapper for barcode scanner that parses flight data from boarding pass


import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BoardingPassScanner extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    hasCameraPermission: null
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }


  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {

      let tb = '60%';
      let lr = 10;

      var shadeStyle = {
        backgroundColor: '#000',
        opacity: .7
      };


      return (
        <View style={{flex:1}}>
          <BarCodeScanner
            onBarCodeRead={this.handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <View style={[{flex:5}, shadeStyle]}></View>
            <View style={{flex:3, flexDirection: 'row'}}>
              <View style={[{flex:1},shadeStyle]}></View>
              <View style={{flex:10}}></View>
              <View style={[{flex:1},shadeStyle]}></View>
            </View>
            <View style={[{flex:5}, shadeStyle]}></View>
          </View>
          <View style={{position: 'absolute', top: 400, left: 0, right: 0, bottom: 60, backgroundColor: 'rgba(0,0,0,0)'}}>
            <Text style={{flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 40, color: '#FFF', fontWeight: '200'}}>Scan Boarding Pass</Text>
          </View>
        </View>
      );
    }
  }

  handleBarCodeRead = ({ type, data }) => {
    if(type == "org.iso.PDF417" && global.scannerActive && global.modeChooserActive ) {
      global.modeChooserActive = false;
      let depart = data.substr(30,3);
      let arrive = data.substr(33,3)
      this.props.callbackFromParent(depart,arrive);
    }
  }

}

BoardingPassScanner.propTypes = {
  callbackFromParent: PropTypes.func
};
