const pool = require('../utils/db');

const getCamps = async (req, res) => {
    try {
        const allCamps = await pool.query('SELECT * FROM camps WHERE active_status = TRUE');
        res.status(200).json(allCamps.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCamp = async (req, res) => {
    try {
        const { name, images, venue, village, dateoforganization } = req.body;
        const newCamp = await pool.query(
            'INSERT INTO camps (name, images, venue, village, dateoforganization, active_status) VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING *',
            [name, images, venue, village, dateoforganization]
        );
        res.status(201).json(newCamp.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCamp = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCamp = await pool.query('UPDATE camps SET active_status = FALSE WHERE id = $1', [id]);
        if (deletedCamp.rowCount === 0) {
            return res.status(404).json({ message: 'Camp not found' });
        }
        res.status(200).json({ message: 'Camp deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampsByVillage = async (req, res) => {
    try {
        const village = req.body.villageId;
        const allCamps = await pool.query(
            'SELECT * FROM camps WHERE village = $1 AND active_status = TRUE',
            [village]
        );
        res.status(200).json(allCamps.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampVillages = async (req, res) => {
    try {
        const allVillages = await pool.query('SELECT DISTINCT village FROM camps WHERE active_status = TRUE');
        res.status(200).json(allVillages.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCampVillages,
    getCamps,
    createCamp,
    deleteCamp,
    getCampsByVillage
};
