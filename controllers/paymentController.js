const { createOrder, verifyPayment } = require('../utils/razorpay');

exports.createPaymentOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await createOrder(amount, currency, receipt);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) return res.status(400).json({ msg: 'Invalid payment' });
    res.json({ msg: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};