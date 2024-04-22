const { addRegistrationQuery, getRegistrationsQuery , deleteRegistrationQuery } = require("../models/registrationModel");

const addRegistration = async (req, res) => {
    try {
        const res1 = await addRegistrationQuery(req.body, res)
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

const getRegistrations = async (req, res) => {
    try {
        const res1 = await getRegistrationsQuery(req.body, res)
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
}

const deleteRegistration = async (req, res) => {
    try {
        const res1 = await deleteRegistrationQuery(req.body, res)
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
}

module.exports = { addRegistration , getRegistrations , deleteRegistration};