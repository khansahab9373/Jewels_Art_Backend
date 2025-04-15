// Import the OrderModel
import OrderModel from "../models/orderModel.js";

// Controller to handle order booking
const bookOrder = async (req, res) => {
  try {
    // Create booking details using the request body
    const bookingDetails = await OrderModel.create(req.body);

    // Check if booking details were created
    if (!bookingDetails) {
      return res.status(400).json({
        success: false,
        message: "Please provide booking details before submitting.",
      });
    }

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Booking details submitted successfully.",
      bookingDetails,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      success: false,
      message: "Error while creating booking.",
      error: error.message,
    });
  }
};

// Controller to fetch all booking details
const getBookingDetails = async (req, res) => {
  try {
    // Fetch all booking details
    const bookingDetails = await OrderModel.find();

    // Respond with fetched details
    res.status(200).json({
      success: true,
      message: "Booking details fetched successfully.",
      totalBookingDetails: bookingDetails.length,
      bookingDetails,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      success: false,
      message: "Error while fetching bookings.",
      error: error.message,
    });
  }
};

// Export controllers
export { bookOrder, getBookingDetails };
