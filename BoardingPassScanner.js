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
      return (
        <BarCodeScanner
          onBarCodeRead={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      );
    }
  }

  handleBarCodeRead = ({ type, data }) => {
    if(type == "org.iso.PDF417" && global.scannerActive && global.modeChooserActive ) {
      global.scannerActive = false;
      let depart = data.substr(30,3);
      let arrive = data.substr(33,3)
      this.props.callbackFromParent(depart,arrive);
    }
  }

}

BoardingPassScanner.propTypes = {
  callbackFromParent: PropTypes.func
};
