const pool = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create({ email, password, isAdmin = false }) {
    const [result] = await pool.query(
      "INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)",
      [email, password, isAdmin]
    );
    return { id: result.insertId, email, isAdmin };
  }
}

module.exports = User;
