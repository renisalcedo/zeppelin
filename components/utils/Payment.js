import axios from 'axios'

const Payment = (firstName, lastName, cardNumber, expMonth, expYear, cvc, amount, token)  => {
  // Makes a call to server for creating payment
  axios.post('https://95042e9d.ngrok.io/stripe', {
    token,
    firstName,
    lastName,
    cardNumber,
    expMonth,
    expYear,
    cvc,
    amount,
    token
  }).then(res => res)
    .catch(err => err)
}
