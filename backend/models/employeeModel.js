require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const getEmployeesQuery = async () => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_PRIVATE_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[3];
    await sheet.loadCells();
    const rows = sheet.rowCount;
    const cols = sheet.columnCount;
    const data = [];
    const headers = [];
    for (let j = 0; j < cols; j++) {
      const cell = sheet.getCell(0, j);
      headers.push(cell.value);
    }
    for (let i = 1; i < rows; i++) {
      const firstCell = sheet.getCell(i, 0);
      if (!firstCell.value) {
        break;
      }
      const rowData = {};
      for (let j = 0; j < cols; j++) {
        const cell = sheet.getCell(i, j);
        rowData[headers[j]] = cell.value;
      }
      data.push(rowData);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addEmployeeQuery = async (reqParams, res) => {
  try {
    const serialNumber = await getEmployeesQuery().then((data) => {
      return data.length + 1;
    })
    const EmpNo = reqParams.EmpId;
    const Name = reqParams.Name;
    const PhoneNumber = reqParams.PhoneNumber;
    const Designation = reqParams.Designation;
    const Location = reqParams.Location;
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_PRIVATE_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[3];
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    const rowData = {};
    rowData[headers[0]] = serialNumber;
    rowData[headers[1]] = EmpNo;
    rowData[headers[2]] = Name;
    rowData[headers[3]] = PhoneNumber;
    rowData[headers[4]] = Designation;
    rowData[headers[5]] = Location
    await sheet.addRow(rowData);
    return "Data has been added";
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployeesQuery = async (reqParams, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_PRIVATE_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[3];
    await sheet.loadCells();
    const Id = parseInt(reqParams.Id);
    const rows = sheet.rowCount;
    let rowIndexToDelete = -1;
    let deletedData;
    for (let i = 0; i < rows; i++) {
      const cell = sheet.getCell(i, 0);
      const cellValue = parseInt(cell.value);
      if (cellValue === Id) {
        rowIndexToDelete = i;
        deletedData = sheet.getCell(i, 2).value;
        break;
      }
    }
    if (rowIndexToDelete !== -1) {
      await sheet.clearRows(rowIndexToDelete, rowIndexToDelete + 1);
      return {
        message: "Employee data has been deleted",
        deletedData: deletedData,
      };
    } else {
      return { message: "Employee with the provided Id not found" };
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting employee data" });
  }
};


module.exports = {
  addEmployeeQuery,
  getEmployeesQuery,
  deleteEmployeesQuery
};
