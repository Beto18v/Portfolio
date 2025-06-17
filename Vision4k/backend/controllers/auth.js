const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("..models/User");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Crear y devolver token JWT
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { login };
