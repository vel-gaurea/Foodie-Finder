// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// exports.createOrder = async (amount, currency, receipt) => {
//   const options = {
//     amount: amount * 100, // amount in the smallest currency unit
//     currency,
//     receipt
//   };
//   return instance.orders.create(options);
// };

// exports.verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
//   const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//   hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
//   const generated_signature = hmac.digest('hex');
//   return generated_signature === razorpay_signature;
// };