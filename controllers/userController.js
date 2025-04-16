import { createUser, getUserByEmail } from "../services/userServices.js";
import bcrypt from "bcryptjs";

// Signup handler
const signupUser = async (req, res) => {
  const { name, phone, email, dob, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await createUser({ name, phone, email, dob, password: hashedPassword });
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
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

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

export { signupUser, loginUser };
