const { addCampQuery, getCampsQuery, deleteCampQuery } = require("../models/campModel");

const addCamp = async (req, res) => {
    try {
        const res1 = await addCampQuery(req.body, res)
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

const getCamps = async (req, res) => {
    try {
        const res1 = await getCampsQuery(req.body, res)
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

const deleteCamp = async (req, res) => {
    try {
        const res1 = await deleteCampQuery(req.body, res)
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

module.exports = { addCamp, getCamps, deleteCamp };