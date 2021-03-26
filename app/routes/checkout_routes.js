const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const express = require('express')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:4741'

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png']
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  })
  res.json({ id: session.id })
})

module.exports = router
