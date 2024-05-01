require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const getRegistrationsQuery = async () => {
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
    const sheet = doc.sheetsByIndex[1];
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

const addRegistrationQuery = async (reqParams, res) => {
  try {
    const serialNumber = await getRegistrationsQuery().then((data) => {
      return data.length + 1;
    });
    const fullName = reqParams.FullName;
    const address = reqParams.Address;
    const village = reqParams.Village;
    const aadharNumber = reqParams.AadharNumber;
    const gender = reqParams.Gender;
    const age = reqParams.Age;
    const phoneNumber = reqParams.PhoneNumber;
    const Taluka = reqParams.Taluka;
    const District = reqParams.District;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    const dateString =
      (day < 10 ? "0" : "") +
      day +
      "." +
      (month < 10 ? "0" : "") +
      month +
      "." + 
      year;
    console.log("Todays Date ----> ",dateString)
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
    const sheet = doc.sheetsByIndex[1];
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    console.log(headers)
    const rowData = {};
    rowData[headers[0]] = serialNumber;
    rowData[headers[1]] = fullName;
    rowData[headers[2]] = address;
    rowData[headers[3]] = village;
    rowData[headers[4]] = Taluka;
    rowData[headers[5]] = District;
    rowData[headers[6]] = aadharNumber;
    rowData[headers[7]] = gender;
    rowData[headers[8]] = age;
    rowData[headers[9]] = phoneNumber;
    rowData[headers[10]] = String(dateString);
    await sheet.addRow(rowData);
    return "Data has been added";
  } catch (error) {
    console.log(error);
  }
};

const deleteRegistrationQuery = async (reqParams, res) => {
  try {
    const ID = reqParams.Id;
    const registrationData = await getRegistrationsQuery();
    const deleteIndex = registrationData.findIndex((employee) => employee.Id === ID);
    if (deleteIndex === -1) {
      return "Registration not found.";
    }
    registrationData.splice(deleteIndex, 1);
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
    const sheet = doc.sheetsByIndex[1];
    await sheet.clearRows(1);
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    await sheet.addRow(headers.map((header) => header.value));
    for (const [index, employee] of registrationData.entries()) {
      employee.Id = index + 1;
      await sheet.addRow(Object.values(employee));
    }
    return "Registration record deleted and IDs corrected.";
  } catch (error) {
    console.error("Error deleting registration record:", error);
    throw error;
  }
};

module.exports = {
  addRegistrationQuery,
  getRegistrationsQuery,
  deleteRegistrationQuery
};
