import React, { Component } from "react"
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input"
import { StyleSheet, View, Switch, AsyncStorage } from "react-native"
import Storage from 'react-native-storage'
import dismissKeyboard from 'react-native-dismiss-keyboard'

const stripe = require('stripe-client')('pk_test_w7Y0kizm699qdUNBng1Jlltm')

//import Localdb from './utils/Localdb'

const storage = new Storage({
  // maximum capacity, default 1000 size: 1000, 
  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync : {
  // we'll talk about the details later.
  }
})

global.storage = storage

export default class CreditCardScreen extends Component {
  constructor() {
    super()
  }

  /*
   *componentDidMount() {
   *  console.log(Localdb(storage))
   *}
   */

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
      console.log(ready)
      console.log(user)
      this.createToken(user)
    }
  }

  async createToken(user) {
    const card  = await stripe.createToken(user)
    const token = card.id

    this.saveData(user, token)
  }

  saveData(customer, token) {
    // Save something with key only.
    // Something more unique, and constantly being used.
    // They are permanently stored unless you remove.
    storage.save({
      key: 'loginState',
      data: {
        name: customer.card.name,
        postalCode: customer.postalCode,
        token: token,
      },

      expires: null
    });

    storage.load({
      key: 'loginState',
      autoSync: true,

      syncParams: {
        extraFetchOptions: {
                // blahblah
        },
        someFlag: true,
      },
    }).then(ret => {
      console.log(ret.userid);
      console.log(ret)
    }).catch(err => console.log(err))
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
