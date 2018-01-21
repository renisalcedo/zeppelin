import React, { Component } from "react"
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input"
import { StyleSheet, View, Switch, AsyncStorage } from "react-native"
import dismissKeyboard from 'react-native-dismiss-keyboard'

// Creates instance of localdb
import Localdb from './utils/Localdb'
import Payment from './utils/Payment'

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
    const pay = new Payment()
    pay.handlePayment(20)

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
      this.saveData(user)
    }
  }

  saveData(user) {
    const customer = new Localdb()

    customer.save(user)
  }
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
