import { AsyncStorage } from 'react-native';

const stripe = require('stripe-client')('pk_test_w7Y0kizm699qdUNBng1Jlltm')
const axios = require('axios')

// Instance of localdb
import Localdb from './Localdb'

class Payment {
  getUserPayment() {

    const user = new Localdb().getUser()
    //user.getUser().then(this.handlePayment)

    return user
  }

  async createToken(user) {
    const card  = await stripe.createToken(user)
    const token = card.id

    return token
  }

  handlePayment(amount) {
    let user = this.getUserPayment()
    let _amount = amount

    user.then((res) => {
      const token = this.createToken(res)
      console.log(token)

      this.payment(_amount, 'usd', token)
     /*
      *console.log(token, _amount)
      *this.payment(_amount, 'usd', token)
      */
   })
 }

  payment(amount, currency, token) {
    const _currency = currency || 'usd'

    //AsyncStorage.setItem('amount', amount)

  // Makes a call to server for creating payment
    axios.post('https://95042e9d.ngrok.io/stripe', {
      amount,
      _currency,
      token,
    })
     .then(res => res)
     .catch(err => err)
  }
}

export default Payment
