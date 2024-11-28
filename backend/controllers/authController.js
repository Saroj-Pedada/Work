const { pool } = require("../utils/db");
const bcrypt = require("bcrypt");
const { setUser } = require("../utils/token");

/**
 * Asynchronous function that handles user login.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the function is complete.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!pool) {
            throw new Error("Database client is not initialized. Call dbInit first.");
        }

        let user;
        try {
            const query = `
                SELECT * FROM users
                WHERE email = $1 AND active_status = true
                `;
            const values = [email];

            user = await pool.query(query, values);
        } catch (err) {
            console.error("Error checking if user exists:", err);
            throw err;
        }

        if (user.rows.length === 0) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const token = setUser({
            id: user.rows[0].id,
            access_level: user.rows[0].access_level,
        });
        console.log(token);

        res.json({ msg: "Login successful", token: token });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports = { loginUser }