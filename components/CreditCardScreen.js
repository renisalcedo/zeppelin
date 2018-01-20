// screen that tracks total contributions, social integration?
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import t from 'tcomb-form-native'

const Form = t.form.Form

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  cardNumber: t.Number,
  expMonth: t.Number,
  expYear: t.Number,
  cvc: t.Number,
})

export default class CreditCardScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName:  '',
      cardNumber: 0,
      expMonth: 0,
      expoYear: 0,
      cvc: 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          type={User}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
