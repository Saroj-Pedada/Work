const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    access_level INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    emp_id VARCHAR(255) UNIQUE,
    designation VARCHAR(255),
    village VARCHAR(255),
    address VARCHAR(255),
    taluka VARCHAR(255),
    district VARCHAR(255),
    aadhar VARCHAR(12),
    gender VARCHAR(255),
    age INT,
    dateOfRegistration DATE DEFAULT CURRENT_DATE,
    active_status BOOLEAN DEFAULT TRUE
  );
  
  CREATE TABLE IF NOT EXISTS hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    images TEXT[],
    village VARCHAR(255) NOT NULL,
    active_status BOOLEAN DEFAULT TRUE
  );
  
  CREATE TABLE IF NOT EXISTS camps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    images TEXT[],
    venue VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    dateOfOrganization DATE NOT NULL,
    active_status BOOLEAN DEFAULT TRUE
  );
  
  CREATE TABLE IF NOT EXISTS work (
    id SERIAL PRIMARY KEY,
    emp_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    village VARCHAR(255) NOT NULL,
    president_name VARCHAR(255) NOT NULL,
    president_phone VARCHAR(10) NOT NULL,
    cards INT NOT NULL,
    dateOfRegistration DATE NOT NULL DEFAULT CURRENT_DATE,
    active_status BOOLEAN DEFAULT TRUE,
    user_id INT NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES users(emp_id)
  );

  CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(10) NOT NULL,
    amount INT NOT NULL,
    reason TEXT NOT NULL,
    dateOfDonation DATE DEFAULT CURRENT_DATE,
    active_status BOOLEAN DEFAULT TRUE
  );

  CREATE TABLE IF NOT EXISTS president_data (
    id SERIAL PRIMARY KEY,
    president_name VARCHAR(255) NOT NULL,
    president_phone VARCHAR(10) NOT NULL,
    village VARCHAR(255) NOT NULL,
    taluka VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    active_status BOOLEAN DEFAULT TRUE
  );
`);

    const adminEmail = "csm@csmmultipurposeorganisation.com";
    const adminPassword = "password";
    const adminAccessLevel = 0;
    const adminName = "Admin";
    const adminPhone = "1234567890";

    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      adminEmail,
    ]);
    if (result.rows.length === 0) {
      // Insert default admin user
      await client.query(
        `
        INSERT INTO users (email, password, access_level, name, phone)
        VALUES ($1, $2, $3, $4, $5);
      `,
        [adminEmail, adminPassword, adminAccessLevel, adminName, adminPhone]
      );
      console.log("Default admin user inserted");
    } else {
      console.log("Admin user already exists");
    }

    console.log("Tables created or already exist");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  createTables,
};
