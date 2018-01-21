// screen that tracks total contributions, social integration?

import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';

require('./Palette.js');

export default class CharityScreen extends React.Component {

  render() {
    return (
      <ScrollView>
        <ImageBackground source={require('./forest.jpeg')} style={styles.header}>
          <Text style={styles.title}>
              coolearth
          </Text>
          <Text style={styles.tag}>
            climate change mitigation through direct action ~
            preventing deforestation ~
            community-based economic empowerment
          </Text>
        </ImageBackground>
        <View style={{marginBottom:20}}>
          <Text style={styles.paragraph}>
            All donations made through Zeppelin are sent to Cool Earth, a highly
            effective charity fighting climate change and preserving both habitat
            and human traditions through their work to prevent deforestation in
            the rainforests of the world. Cool Earth has been called "the most cost-effective
            charity we have identified to date which works on mitigating climate
            change through direct action" by Giving What We Can, a world authority
            on effective charitable giving.
          </Text>
          <Text style={styles.paragraph}>
            Cool Earth prevents deforestation by establishing civic and economic
            relationships with communities who otherwise are at high risk of selling
            their lands for industrial logging. By providing members of these
            communities with alternative opportunities for advancement, Cool Earth enables
            them to both preserve the natural world and resist deforestation that
            threatens their homes, livelihoods, and lifestyles, all while benefitting from
            new economic opportunities.
          </Text>
          <Text style={styles.paragraph}>
            Both Cool Earth and third party organizations perform extensive
            quantititative research to verify the impact both of their current
            work and their potential for additional carbon sequestration by preventing
            deforestation, including considering the possibility of greater deforestation
            in areas they do not work. Due to this deeply thorough review, one
            can have a high degree of confidence in the estimated carbon offset
            per dollar enjoyed by a donation to Cool Earth, estimated to be about
            $1.34 per tonne of CO₂. This is about 25 times better than the industry
            standard for carbon credits.
          </Text>
          <Text style={styles.paragraph}>
            Using well-known estimates of the carbon footprints of air and ground
            transportation, we are able to determine the very small additional
            spending necessary to enable carbon neutral travel. Now, anyone
            can meet the needs of our global world while still behaving responsibly
            towards our ecosystem!
          </Text>
          <Text style={[styles.paragraph,styles.footer]}>
            The information on this page are in large part drawn from the report
            done by Giving What We Can in 2016, found&nbsp;
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.givingwhatwecan.org/report/cool-earth/')}>
                  here.
            </Text>
          </Text>
        </View>
      </ScrollView>

    );
  }

}

const styles = StyleSheet.create({
  header :{
    width: '100%',
    height: 250,
    paddingLeft: 10,
    paddingRight: 10
  },
  title : {
    backgroundColor: 'transparent',
    fontSize: 50,
    marginTop: 20,
  },
  tag: {
    backgroundColor: 'transparent',
    fontSize: 22,
    marginTop: 40,
    lineHeight: 30,
    fontWeight: '200',
    color: 'white'
  },
  paragraph: {
    textAlign: 'justify',
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: '200',
    lineHeight: 30,
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15
  },
  footer : {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight:20
  }
});
