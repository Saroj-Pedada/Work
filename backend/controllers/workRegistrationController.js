const { addRegistrationQuery, getRegistrationsQuery , deleteRegistrationQuery } = require("../models/workRegistrationModel");

const addRegistration = async (req, res) => {
    try {
        const res1 = await addRegistrationQuery(req.body, res)
        if (res1=="Employee not found in the database.") {
            res.status(200).json("Employee not found in the database.");
            return;
        } else if (res1=="Phone doesnt match") {
            res.status(200).json("Phone doesnt match");
            return;
        }
        else if (res1=="Employee has already registered work today.") {
            res.status(200).json("Employee has already registered work today.");
            return;
        } else if (res1=="Work registration can only be done between 5 PM and 10 PM.") {
            res.status(200).json("Can't register at this moment")
        }
        else if (res1) {
            res.status(200).json("Data Added Successfully");
            return;
        }
        else {
            res.status(200).json("Failed to add Data");
            return;
        }
    } catch (error) {
        res.status(200).json({
            error: "An error occurred"
        });
        return;
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