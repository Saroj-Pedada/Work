const pool = require('../utils/db');

const createHospital = (req, res) => {
    const { name, location, images, village } = req.body;
    const query = {
        text: `INSERT INTO hospitals (id, name, location, images, village, active_status) VALUES (DEFAULT, $1, $2, $3, $4, TRUE) RETURNING *`,
        values: [name, location, images, village]
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows[0]);
        }
    });
};

const getHospitals = (req, res) => {
    const query = {
        text: 'SELECT * FROM hospitals WHERE active_status = TRUE',
        values: []
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows);
        }
    });
};

const getHospitalsByVillage = (req, res) => {
    const { villageId } = req.body;
    const query = {
        text: 'SELECT * FROM hospitals WHERE village = $1 AND active_status = TRUE',
        values: [villageId]
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows);
        }
    });
};

const deleteHospital = (req, res) => {
    const { id } = req.body;
    const query = {
        text: 'UPDATE hospitals SET active_status = FALSE WHERE id = $1',
        values: [id]
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send({ message: 'Hospital deleted successfully' });
        }
    });
};

const getHospitalVillages = (req, res) => {
    const query = {
        text: 'SELECT DISTINCT village FROM hospitals WHERE active_status = TRUE',
        values: []
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows);
        }
    });
};

module.exports = {
    createHospital,
    getHospitals,
    getHospitalsByVillage,
    deleteHospital,
    getHospitalVillages
};
