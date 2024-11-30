const pool = require('../utils/db');
const { getIdOfUser } = require('../utils/token');

const registerWork = (req, res) => {
    const cookies = req.cookies.user;
    const user_id = getIdOfUser(cookies);
    const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [user_id]
    }
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
        else {
            const user_data = result.rows[0];
            const newquery = {
                text: 'INSERT INTO work (id, emp_id, name, phone, village, president_name, president_phone, cards, dateofregistration, active_status, user_id) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, NOW(), TRUE, $8) RETURNING *',
                values: [user_data.emp_id, user_data.name, user_data.phone, req.body.village, req.body.president_name, req.body.president_phone, req.body.cards, user_id]
            }
            pool.query(newquery, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Internal Server Error' });
                } else {
                    res.status(200).send(result.rows[0]);
                }
            })
        }
    })
}

const getWorks = (req, res) => {
    const query = {
        text: 'SELECT * FROM work where active_status = TRUE'
    }
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows);
        }
    })
}

const getWorksById = (req, res) => {
    const cookies = req.cookies.user;
    const id = getIdOfUser(cookies);

    const query = {
        text: 'SELECT * FROM work WHERE user_id = $1 AND active_status = TRUE',
        values: [id]
    }
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send(result.rows);
        }
    })
}

const deleteWork = (req, res) => {
    const { id } = req.body;
    const query = {
        text: 'UPDATE work SET active_status = FALSE WHERE id = $1',
        values: [id]
    }
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        } else {
            res.status(200).send({ message: 'Work deleted successfully' });
        }
    })
}

module.exports = { registerWork, getWorks, deleteWork, getWorksById };