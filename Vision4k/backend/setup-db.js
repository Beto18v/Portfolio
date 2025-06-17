const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  let connection;
  try {
    // Conexión sin especificar la base de datos
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    // Crear la base de datos si no existe
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "vision4k_db"}`
    );
    console.log("Database created or already exists");

    // Usar la base de datos
    await connection.query(`USE ${process.env.DB_NAME || "vision4k_db"}`);

    // Crear tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de wallpapers
    await connection.query(`
      CREATE TABLE IF NOT EXISTS wallpapers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Tables created successfully");

    // Insertar usuario admin si no existe (contraseña: admin123)
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = "admin@vision4k.com"'
    );
    if (users.length === 0) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      await connection.query(
        "INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)",
        ["admin@vision4k.com", hashedPassword, true]
      );
      console.log("Admin user created: admin@vision4k.com / admin123");
    }

    console.log("Database setup completed successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();
