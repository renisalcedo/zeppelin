import React, { Component } from "react"
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input"
import { StyleSheet, View, Switch, AsyncStorage } from "react-native"
import dismissKeyboard from 'react-native-dismiss-keyboard'

const stripe = require('stripe-client')('pk_test_w7Y0kizm699qdUNBng1Jlltm')

// Creates instance of localdb
import Localdb from './utils/Localdb'

export default class CreditCardScreen extends Component {
  constructor() {
    super()
  }

  state = { useLiteCreditCardInput: false }

  // Form handlers
  _onChange = (formData) => this.handleData(formData)
  _onFocus = (field) => console.log("focusing", field)
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput })

  render() {
    return (
      <View style={s.container}>
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} />

        { this.state.useLiteCreditCardInput ?
          (
            <LiteCreditCardInput
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange}
              allowScroll={true}
            />
          ) : (
            <CreditCardInput
              requiresName
              requiresCVC
              requiresPostalCode

              cardScale={1.0}
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              allowScroll={true}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
      </View>
    );
  }

  // Process and validates user's data
  handleData(customer) {
    let user = {}
    let ready = false

    // Will process when 1st and last item are valid
    if(customer.values.postalCode.length >= 5) {

      let expiry = customer.values.expiry
      let date = expiry.split('/')
      let cardNumber = customer.values.number.replace(/\s/g, '')

      user = {
        card: {
          name: customer.values.name,
          number: cardNumber,
          cvc: customer.values.cvc,
          exp_month: date[0],
          exp_year: date[1],
        },

        type: customer.values.type,
        postalCode: customer.values.postalCode,
      }

      ready = true
    }

    // Generates the token with user's info
    if(ready) {
      dismissKeyboard()
      this.createToken(user)
    }
  }

  async createToken(user) {
    const card  = await stripe.createToken(user)
    const token = card.id

    this.saveData(user, token)
  }

  saveData(customer, token) {
    customer.token = token
    const user = new Localdb()

    user.save(customer)
    this.getData()
  }

/*
 *  getData() {
 *    let user = new Localdb()
 *    let data = user.getUser()
 *
 *    data.then(this.receiveData)
 *  }
 *
 *  receiveData(data) {
 *    console.log(data)
 *  }
 */
}

// Styles object
const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});
