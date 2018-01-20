const express = require('express')
const bodyParser = require('body-parser')

// Credentials for stripe api
const key = require('./utils/stripeKey')
const stripe = require("stripe")(key())

// Initial express setup
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Handles payment for stripe
app.post('/stripe', (req, res) => {
  if(!req.body) return res.sendStatus(400)

  // Amount in cents * 100
  const amount   = (req.body.amount * 100)
  const currency = req.body.currency

  // Will create new customer along with donation
  stripe.customers.create({
    card: req.body.token
  }).then(customer =>

   stripe.charges.create({
      amount,
      currency,
      customer: customer.id,
    }))
    .catch(err => console.log("Error:", err))
})

app.listen(port, () => {
  console.log(`API: localhost:${port}`)
})
