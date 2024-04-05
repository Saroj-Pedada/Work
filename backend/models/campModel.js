require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const addCampQuery = async (reqParams, res) => {
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

const getCampsQuery = async (reqParams, res) => {
  try {
    // Create a JWT authentication instance
    const serviceAccountAuth = new JWT({
      email: "healthcamps@healthcamps-419018.iam.gserviceaccount.com",
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace escaped newline characters
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Instantiate GoogleSpreadsheet with authentication
    const doc = new GoogleSpreadsheet(
      "16ZnlvkjiOIAPpxl542HZ9WyqYlcjQdkWauQYEARXrh0",
      serviceAccountAuth
    );

    // Load spreadsheet information
    await doc.loadInfo();

    // Find the sheet by index (assuming it's the first sheet)
    const sheet = doc.sheetsByIndex[0];

    // Load all rows from the sheet
    await sheet.loadCells();

    // Construct JSON object
    const rows = sheet.rowCount;
    const cols = sheet.columnCount;
    const data = [];

    // Assuming first row is headers
    const headers = [];
    for (let j = 0; j < cols; j++) { // Adjusted loop condition
        const cell = sheet.getCell(0, j);
        headers.push(cell.value);
    }

    // Start from second row (index 1) as first row contains headers
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

const deleteCampQuery = async (reqParams, res) => {
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

const editCampQuery = async (reqParams, res) => {
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
  addCampQuery,
  getCampsQuery,
  deleteCampQuery,
  editCampQuery,
};
