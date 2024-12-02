const { pool } = require("../utils/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../utils/nodemailer");
const { getIdOfUser } = require("../utils/token");
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        let users;
        try {
            const query = `
                SELECT * FROM users WHERE access_level = 2 AND active_status = TRUE
                `;
            users = await pool.query(query);
        } catch (err) {
            console.error("Error getting all users:", err);
            throw err;
        }

        res.json(users.rows);
    } catch (err) {
        console.error("Error getting all users:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getUserById = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        const { id } = req.params;

        let user;
        try {
            const query = `
                SELECT * FROM users
                WHERE id = $1 AND active_status = TRUE
                `;
            const values = [id];

            user = await pool.query(query, values);
        } catch (err) {
            console.error("Error getting user by id:", err);
            throw err;
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error("Error getting user by id:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const createUser = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        const {
            email,
            FullName,
            Address,
            Taluka,
            District,
            Village,
            AadharNumber,
            Gender,
            Age,
            PhoneNumber
        } = req.body;
        const password = crypto.randomBytes(8).toString('hex');
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        sendEmail(email, "Welcome to CSM Multipurpose Organisation", `Your account at CSM Multipurpose Organisation has been created. Your password is ${password}. Please change your password after logging in. Thank you for joining.`);

        let user;
        try {
            const query = `
                INSERT INTO users (email, password, access_level, name, phone, emp_id, designation, village, address, taluka, district, aadhar, gender, age)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING *;
                `;
            const values = [
                email,
                hashedPassword,
                2,
                FullName,
                PhoneNumber,
                null,
                null,
                Village,
                Address,
                Taluka,
                District,
                AadharNumber,
                Gender,
                Age,
            ];

            user = await pool.query(query, values);
        } catch (err) {
            console.error("Error creating user:", err);
            throw err;
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        const { id } = req.params;

        let user;
        try {
            const query = `
                UPDATE users
                SET active_status = FALSE
                WHERE id = $1
                RETURNING *;
                `;
            const values = [id];

            user = await pool.query(query, values);
        } catch (err) {
            console.error("Error deleting user:", err);
            throw err;
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getEmployees = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        let employees;
        try {
            const query = `
                SELECT * FROM users
                WHERE access_level = 1 AND active_status = TRUE
                `;
            employees = await pool.query(query);
        } catch (err) {
            console.error("Error getting employees:", err);
            throw err;
        }

        res.json(employees.rows);
    } catch (err) {
        console.error("Error getting employees:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const createEmployee = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        const {
            emp_id,
            name,
            email,
            phone,
            designation,
            village,
        } = req.body;

        const password = crypto.randomBytes(8).toString('hex');
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        sendEmail(email, "Welcome to CSM Multipurpose Organisation", `Your account at CSM Multipurpose Organisation has been created. Your password is ${password}. Please change your password after logging in. Thank you for joining.`);

        let employee;
        try {
            const query = `
                INSERT INTO users (email, password, access_level, name, phone, emp_id, designation, village)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
                `;
            const values = [
                email,
                hashedPassword,
                1,
                name,
                phone,
                emp_id,
                designation,
                village,
            ];

            employee = await pool.query(query, values);


            res.status(200).json({ msg: "Employee created successfully" });
        } catch (err) {
            console.error("Error creating employee:", err);
            throw err;
        }
    } catch (err) {
        console.error("Error creating employee:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        const cookies = req.body.cookies;
        console.log(cookies);
        const id = getIdOfUser(cookies);

        let user;
        try {
            const query = `
                SELECT * FROM users
                WHERE id = $1 AND active_status = TRUE
                `;
            const values = [id];

            user = await pool.query(query, values);
        } catch (err) {
            console.error("Error getting profile:", err);
            throw err;
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error("Error getting profile:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }
        const { id, new_password } = req.body;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(new_password, salt);

        let user;
        try {
            const query = `
                UPDATE users
                SET password = $2
                WHERE id = $1 AND active_status = TRUE
                RETURNING *;
                `;
            const values = [id, hashedPassword];

            user = await pool.query(query, values);
        }
        catch (err) {
            console.error("Error changing password:", err);
            throw err;
        }

        res.status(200).json({ msg: "Password changed successfully" });

    } catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = {
    getUsers,
    getEmployees,
    getUserById,
    createUser,
    createEmployee,
    deleteUser,
    getProfile,
    changePassword,
};