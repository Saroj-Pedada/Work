require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const addHospitalQuery = async (reqParams, res) => {
  try {
    const name = reqParams.name;
    const description = reqParams.description;
    const location = reqParams.location;
    const village = reqParams.village;
    const date = reqParams.date;
    const timing = reqParams.timing;
    const images = reqParams.imageData;
    return "Data has been added";
  } catch (error) {
    console.log(error);
  }
};

const getHospitalsQuery = async (reqParams, res) => {
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
    const sheet = doc.sheetsByIndex[2];
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
        rowData[headers[j]] = cell.value
      }
      data.push(rowData);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteHospitalQuery = async (reqParams, res) => {
  try {
    const name = reqParams.name;
    const description = reqParams.description;
    const location = reqParams.location;
    const village = reqParams.village;
    const date = reqParams.date;
    const timing = reqParams.timing;
    const images = reqParams.imageData;
    return "Data has been deleted";
  } catch (error) {
    console.log(error);
  }
};

const editHospitalQuery = async (reqParams, res) => {
  try {
    const name = reqParams.name;
    const description = reqParams.description;
    const location = reqParams.location;
    const village = reqParams.village;
    const date = reqParams.date;
    const timing = reqParams.timing;
    const images = reqParams.imageData;
    return "Data has been edited";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addHospitalQuery,
  getHospitalsQuery,
  deleteHospitalQuery,
  editHospitalQuery,
};