import { random, range, round } from "lodash";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

require('./Palette.js');

export default class TrophyScreen extends Component {

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>
            Total Offsets:
          </Text>
        </View>
        <View style={styles.display}>
          <View style={styles.digit}>
            <Text style={styles.digitText}>9</Text>
          </View>
          <View style={styles.digit}>
            <Text style={styles.digitText}>9</Text>
          </View>
          <View style={styles.digit}>
            <Text style={styles.digitText}>9</Text>
          </View>
          <View style={styles.digit}>
            <Text style={styles.digitText}>9</Text>
          </View>
          <View style={styles.digit}>
            <Text style={styles.digitText}>.</Text>
          </View>
          <View style={styles.digit}>
            <Text style={styles.digitText}>9</Text>
          </View>
        </View>
        <View style={styles.main}>

        </View>
      </View>

    );

  }

}

const styles = StyleSheet.create({
  display: {
    backgroundColor: '#CCC',
    flexDirection: 'row',
    flex: 3
  },
  digit: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
    marginLeft: 2
  },
  digitText: {
    color: global.palette[3],
    fontWeight: '200',
    fontSize: 60,
    fontFamily: 'Menlo'
  },
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  top: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: 'green',
    flex: 10
  }
});
