const express = require('express');
const sgMail = require('@sendgrid/mail');
const validate=require("../middleware/postmiddleware")
const Payment = express.Router()
const cartmodel=require("../model/cart")
sgMail.setApiKey("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");

Payment.post('/payment',validate, async (req, res) => {
    try {
        const { amount, cardNumber, cvv, expiry, email} = req.body;

        if (!amount || !cardNumber || !cvv || !expiry ) {
            return res.status(400).json({ error: 'Missing payment information' });
        }



        if (!isValidCardNumber(cardNumber)) {
            return res.status(400).json({ error: 'Invalid card number' });
        }


        if (!isValidCvv(cvv)) {
            return res.status(400).json({ error: 'Invalid CVV' });
        }


        if (!isValidExpiry(expiry)) {
            return res.status(400).json({ error: 'Invalid expiry date' });
        }
       
    // const send=await sendNotificationEmail(email, amount)
     
        await cartmodel.deleteMany({email});

       return res.json({ message: 'Payment successful' });
      
       
    } catch (error) {
        return res.status(401).json({ msg: error.message })
    }
});


function isValidCardNumber(cardNumber) {
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    if (cleanedCardNumber.length !== 16) {
        return false;
    }

    return /^\d{16}$/.test(cleanedCardNumber);
}

function isValidCvv(cvv) {

    return /^\d{3,4}$/.test(cvv);
}

function isValidExpiry(expiry) {

    return /^\d{2}\/\d{2}$/.test(expiry);
}

async function sendNotificationEmail(recipientEmail, amount) {
    const msg = {
      to: recipientEmail,
      from:"nodejsdeveloper499@gmail.com", 
      subject: 'Payment successfull',

      html: `<p>Your payment is successfull of ₹${amount}.</p>`,
    };
  
   await sgMail
      .send(msg)
      .then(() => console.log('Notification email sent successfully'))
      .catch((error) => console.error('Error sending notification email:', error));
  }
 
module.exports =  Payment 