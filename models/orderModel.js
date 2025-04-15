import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  address2: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  postcode: {
    type: String,
    required: [true, "Postcode is required"],
  },
  shippingAddress: {
    type: Boolean,
    default: true,
  },
  saveInfo: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "PayPal"],
    required: [true, "Payment method is required"],
  },
  cardName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expireDate: {
    type: String,
  },
  securityNumber: {
    type: String,
  },
});

// Create the Order model
const OrderModel = mongoose.model("Order", orderSchema);

// Export the model
export default OrderModel;
