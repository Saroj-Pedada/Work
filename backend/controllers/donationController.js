const pool = require('../utils/db');

const getDonations = async (req, res) => {
    try {
        const donations = await pool.query('SELECT * FROM donations WHERE active_status = TRUE');
        res.status(200).json(donations.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addDonation = async (req, res) => {
    try {
        const {name, address, gender, age, phone, amount, reason} = req.body;
        const newDonation = await pool.query(
            'INSERT INTO donations (name, address, gender, age, phone, amount, reason, dateofdonation, active_status) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), TRUE) RETURNING *',
            [name, address, gender, age, phone, amount, reason]
        );
        res.status(201).json(newDonation.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonation = await pool.query(
            'UPDATE donations SET active_status = FALSE WHERE id = $1 RETURNING *',
            [id]
        );
        res.status(200).json(deletedDonation.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDonations, addDonation, deleteDonation };