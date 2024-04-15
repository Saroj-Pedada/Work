const { addHospitalQuery, getHospitalsQuery, deleteHospitalQuery } = require("../models/hospitalModel");

const addHospital = async (req, res) => {
    try {
        const res1 = await addHospitalQuery(req.body, res)
        if (res1) {
            res.status(200).json("Data Added Successfully");
        } else {
            res.status(500).json("Failed to add Data");
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred"
        });
    }
};

const getHospitals = async (req, res) => {
    try {
        const res1 = await getHospitalsQuery(req.body, res)
        if (res1) {
            res.status(200).json(res1);
        } else {
            res.status(500).json("Failed to get Data");
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred"
        });
    }
};

const deleteHospital = async (req, res) => {
    try {
        const res1 = await deleteHospitalQuery(req.body, res)
        if (res1) {
            res.status(200).json("Data Deleted Successfully");
        } else {
            res.status(500).json("Failed to delete Data");
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred"
        });
    }
};

module.exports = { addHospital, getHospitals, deleteHospital };