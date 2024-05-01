require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

function convertDateFormat(dateString) {
  const parts = dateString.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}.${month}.${year}`;
}

const addCampQuery = async (reqParams, res) => {
  try {
    const serialNumber = await getCampsQuery().then((data) => {
      return data.length + 1;
    })
    const name = reqParams.Name;
    const venue = reqParams.Venue;
    const village = reqParams.Village;
    const date = reqParams.Date;
    const Images = reqParams.Images;
    const imageString = Images.join(",");
    console.log(name, venue, village, date);
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
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    const rowData = {};
    rowData[headers[0]] = serialNumber;
    rowData[headers[1]] = name;
    rowData[headers[2]] = venue;
    rowData[headers[3]] = village;
    rowData[headers[4]] = imageString;
    const formattedDate = convertDateFormat(date);
    rowData[headers[5]] = formattedDate;
    await sheet.addRow(rowData);
    return "Data has been added";
  } catch (error) {
    console.log(error);
  }
};

const getCampsQuery = async (reqParams, res) => {
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
    const sheet = doc.sheetsByIndex[0];
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

const deleteCampQuery = async (reqParams, res) => {
  try {
    const ID = reqParams.Id;
    const campData = await getCampsQuery();
    const deleteIndex = campData.findIndex((employee) => employee.Id === ID);
    if (deleteIndex === -1) {
      return "Camp not found.";
    }
    campData.splice(deleteIndex, 1);
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
    const sheet = doc.sheetsByIndex[0];
    await sheet.clearRows(1);
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    await sheet.addRow(headers.map((header) => header.value));
    for (const [index, employee] of campData.entries()) {
      employee.Id = index + 1;
      await sheet.addRow(Object.values(employee));
    }
    return "Camp deleted and IDs corrected.";
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

module.exports = {
  addCampQuery,
  getCampsQuery,
  deleteCampQuery,
};
