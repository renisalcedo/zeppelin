import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from 'react-navigation'

import { DangerZone } from "expo";
import plane from "./airplane.json";
import car from "./car.json";
import check from "./success.json";


require('./Palette.js');

const { Lottie } = DangerZone;

let delay = 2600;

export default class SuccessScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Donation Successful!`,
      header: null
    }
  };

  state = {
    animation: null,
    speed: .7,
    opacity: new Animated.Value(0),
    checkAnimation: null,
    mode: null,
    pixel: new Animated.Value(-550),
    carOpacity: 0
  };

  componentWillMount() {
    this._playAnimation();
    setTimeout(this._playCheck,delay);
    this.setState({
      pixel: new Animated.Value(-550),
      carOpacity: 0
    })
  }

  componentDidMount() {

    setTimeout(()=>{

      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 1200,
        }
      ).start();

    },delay);

    if(this.props.navigation.state.params.mode == 'car') {
      setTimeout(()=>{
        this.setState({
          carOpacity: 1
        })
        Animated.timing(
          this.state.pixel,
          {
            toValue: 100,
            duration: (delay-800),
            easing: Easing.linear
          }
        ).start();
      },500)
    }

    // TODO: conduct payment here

  }

  render() {

    const { state, navigate } = this.props.navigation;

    let params = this.props.navigation.state.params;
    let cost = params.cost;
    let co2 = params.carbon;

    let mode = params.mode;

    return (
      <View style={styles.container}>

        <View style={{
          top: 300,
          zIndex: 4,
          height: 200,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'transparent'}}>

          <View style={{width: 50,height:200}}></View>
          <View style={{width:200,height:200}}>
            {this.state.checkAnimation && (
              <Lottie
                ref={animation => {
                  this.checkAnimation = animation;
                }}
                style={{
                  width: 200,
                  height: 200
                }}
                source={this.state.checkAnimation}
                speed={.6}
                loop={false}
              />
            )}
          </View>
          <View style={{width: 50,height:200}}></View>

        </View>



        <Animated.View style={[
            styles.animationContainer,
            (mode == 'car' ? {
              flex:1,
              justifyContent: 'center',
              left: this.state.pixel,
              top:-70,
              opacity: this.state.carOpacity
            } : {
              top: 0,
              flex:1,
              justifyContent: 'center',
            })
          ]}>
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={
                (mode =='car' ? {width: 800, height: 519} : {width: 1078, height: 700} )}
              source={this.state.animation}
              speed={this.state.speed}
              loop={false}
            />
          )}
        </Animated.View>
        <Animated.View style={[styles.tag,{top: 90,opacity:this.state.opacity}]}>
          <Text style={[styles.words, {fontSize:70}]}>Woohoo!</Text>
        </Animated.View>
        <Animated.View style={[styles.tag,{top: 220,opacity:this.state.opacity}]}>
          <Text style={[styles.words, {fontSize:35}]}>You offset {co2.toFixed(2)} kg CO₂.</Text>
        </Animated.View>
        <Animated.View style={[styles.tag,{top: 530,opacity:this.state.opacity}]}>
        <TouchableOpacity onPress={this._exit}>
          <Text style={{
            zIndex:10,
            fontSize: 30,
            fontWeight: '300',
            color: global.palette[2],
            textAlign: 'center'
            }}>
            Continue
          </Text>
        </TouchableOpacity>

        </Animated.View>

      </View>
    );
  }
  // <Text style={[styles.words, {fontSize:35}]}>Button</Text>

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _playCheck = () => {
    if (!this.state.checkAnimation) {
      this._loadCheck();
    } else {
      this.checkAnimation.reset();
      this.checkAnimation.play();
    }
  };

  _loadAnimation = () => {
    let mode = this.props.navigation.state.params.mode;
    this.setState({ animation: (mode == 'plane' ? plane : car) }, this._playAnimation);
  };

  _loadCheck = () => {
    this.setState({ checkAnimation: check }, this._playCheck);
  };

  _exit = () => {

    this.props.navigation.dispatch({
      routeName:'HomeScreen',
      type: 'GoToRoute',
    });

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  animationContainer: {
    backgroundColor: "#fff",
    // alignItems: "left",
    // justifyContent: "center",
    height: 700,
    top: -200,
    width: '100%'
  },
  speedBtnContainer: {
    flexDirection: "row"
  },
  margin:{
    height:10
  },
  marginRight:{
    width:200
  },
  tag: {
    position: 'absolute',
    left: 0,
    right: 0,
    // backgroundColor: 'transparent'
  },
  words: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '200'
  },
  check: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0
  }
});
