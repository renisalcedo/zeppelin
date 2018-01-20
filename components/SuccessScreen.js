import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated
} from "react-native";
import { DangerZone } from "expo";
import wiggly from "./airplane.json";

const { Lottie } = DangerZone;

export default class SuccessScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Donation Successful!`,
      header: null
    }
  };

  state = {
    animation: null,
    speed: .8,
    opacity: new Animated.Value(0),

  };

  componentWillMount() {
    this._playAnimation();
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

    },2200);

  }

  render() {
    console.log(this.state.opacity);
    return (
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 1078,
                height: 700,
              }}
              source={this.state.animation}
              speed={this.state.speed}
              loop={false}
            />
          )}
        </View>
        <Animated.View style={[styles.tag,{top: 90},{opacity:this.state.opacity}]}>
          <Text style={[styles.words, {fontSize:70}]}>Woohoo!</Text>
        </Animated.View>
        <Animated.View style={[styles.tag,{top: 220},{opacity:this.state.opacity}]}>
          <Text style={[styles.words, {fontSize:35}]}>You offset {787} kg CO₂</Text>
        </Animated.View>
      </View>
    );
  }

  _changeSpeed = (speed) => {
    this.setState({speed})
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _stopAnimation = () => {
    this.animation.reset();
  };

  _loadAnimation = () => {
    this.setState({ animation: wiggly }, this._playAnimation);
  };
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
    flex: 1
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
  }
});
