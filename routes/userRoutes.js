import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import { bookOrder, getBookingDetails } from "../controllers/bookNowCtrl.js";

// API routes
const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/order", bookOrder); // Corrected route path
router.get("/getallorder", getBookingDetails);

export default router;
