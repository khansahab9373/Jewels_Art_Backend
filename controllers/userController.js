import { createUser, getUserByEmail } from "../services/userServices.js";
import bcrypt from "bcrypt";

// Signup handler
const signupUser = async (req, res) => {
  const { name, phone, email, dob, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    await createUser({ name, phone, email, dob, password });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating user", details: err.message });
    console.log(err);
  }
};

// Login handler
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If successful, send a response (or a token if needed)
    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred during login",
      details: error.message,
    });
  }
};

// Combined export
export { signupUser, loginUser };
