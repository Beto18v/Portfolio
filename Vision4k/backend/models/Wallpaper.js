const pool = require("../config/db");

class Wallpaper {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM wallpapers");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM wallpapers WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async getRelated(category, currentId) {
    const [rows] = await pool.query(
      "SELECT * FROM wallpapers WHERE category = ? AND id != ? LIMIT 4",
      [category, currentId]
    );
    return rows;
  }

  static async create({ title, description, category, url }) {
    const [result] = await pool.query(
      "INSERT INTO wallpapers (title, description, category, url) VALUES (?, ?, ?, ?)",
      [title, description, category, url]
    );
    return { id: result.insertId, title, description, category, url };
  }

  static async getByCategory(category) {
    const [rows] = await pool.query(
      "SELECT * FROM wallpapers WHERE category = ?",
      [category]
    );
    return rows;
  }

  static async search(query) {
    const [rows] = await pool.query(
      "SELECT * FROM wallpapers WHERE title LIKE ? OR description LIKE ? OR category LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    return rows;
  }
}

module.exports = Wallpaper;
