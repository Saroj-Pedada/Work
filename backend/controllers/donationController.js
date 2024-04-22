const { addDonationQuery, getDonationsQuery, deleteDonationQuery } = require("../models/donationModel");

const addDonation = async (req, res) => {
    try {
        const res1 = await addDonationQuery(req.body, res)
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

const getDonations = async (req, res) => {
    try {
        const res1 = await getDonationsQuery(req.body, res)
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

const deleteDonation = async (req, res) => {
    try {
        const res1 = await deleteDonationQuery(req.body, res)
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

module.exports = { addDonation, getDonations, deleteDonation };