const { addEmployeeQuery, getEmployeesQuery , deleteEmployeesQuery } = require("../models/employeeModel");

const addEmployee = async (req, res) => {
    try {
        const res1 = await addEmployeeQuery(req.body, res)
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

const getEmployees = async (req, res) => {
    try {
        const res1 = await getEmployeesQuery(req.body, res)
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

const deleteEmployee = async (req, res) => {
    try {
        const res1 = await deleteEmployeesQuery(req.body, res)
        if (res1) {
            res.status(200).json(res1);
        } else {
            res.status(500).json("Failed to delete Data");
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred"
        });
    }
}

module.exports = { addEmployee , getEmployees , deleteEmployee};