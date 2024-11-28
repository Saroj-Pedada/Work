const { pool } = require("../utils/db");

const addPresident = async (req, res) => {
    try {
        const { name, phone, village, taluka, district } = req.body;
        const newPresident = await pool.query(
            'INSERT INTO president_data (name, president_name, president_number, village, taluka, district, active_status) VALUES ($1, $2, $3, $4, $5, $6, TRUE) RETURNING *',
            [name, phone, village, taluka, district]
        );
        res.status(201).json(newPresident.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPresidents = async (req, res) => {
    try {
        const presidents = await pool.query('SELECT * FROM president_data WHERE active_status = TRUE');
        res.status(200).json(presidents.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePresident = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPresident = await pool.query(
            'UPDATE president_data SET active_status = FALSE WHERE id = $1 RETURNING *',
            [id]
        );
        res.status(200).json(deletedPresident.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addPresident, getPresidents, deletePresident };