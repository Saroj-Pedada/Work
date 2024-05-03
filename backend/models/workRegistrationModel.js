require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

function convertDateFormat(dateString) {
  const parts = dateString.split("-");
  const year = parts[2];
  const month = parts[1];
  const day = parts[0];
  return `${day}.${month}.${year}`;
}

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
}

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
    const sheet = doc.sheetsByIndex[5];
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
    const employeeData = await getEmployeesQuery();
    const {
      EmpId,
      EmpName,
      EmpPhone,
      Village,
      PresidentName,
      PresidentPhone,
      Cards,
    } = reqParams;
    console.log(employeeData)
    const existingEmployee = employeeData.find(employee => employee.EmpNo == EmpId);
    if (!existingEmployee) {
      return "Employee not found in the database.";
    }
    if (existingEmployee.PhoneNumber != EmpPhone) {
      return "Phone doesnt match";
    }
    const registrationData = await getRegistrationsQuery();
    const serialNumber = registrationData.length + 1;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    const dateString =
      (day < 10 ? "0" : "") +
      day +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      year;

    console.log("Todays Date ----> ", dateString);

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
    const sheet = doc.sheetsByIndex[5];
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    console.log(headers);
    const rowData = {};
    rowData[headers[0]] = serialNumber;
    rowData[headers[1]] = EmpId;
    rowData[headers[2]] = EmpName;
    rowData[headers[3]] = EmpPhone;
    rowData[headers[4]] = Village;
    rowData[headers[5]] = PresidentName;
    rowData[headers[6]] = PresidentPhone;
    rowData[headers[7]] = Cards;
    rowData[headers[8]] = convertDateFormat(dateString);
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
    const deleteIndex = registrationData.findIndex(
      (employee) => employee.Id === ID
    );
    if (deleteIndex === -1) {
      return "Work registration not found.";
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
    const sheet = doc.sheetsByIndex[5];
    await sheet.clearRows(1);
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    await sheet.addRow(headers.map((header) => header.value));
    for (const [index, employee] of registrationData.entries()) {
      employee.Id = index + 1;
      await sheet.addRow(Object.values(employee));
    }
    return "Work registration record deleted and IDs corrected.";
  } catch (error) {
    console.error("Error deleting registration record:", error);
    throw error;
  }
};

module.exports = {
  addRegistrationQuery,
  getRegistrationsQuery,
  deleteRegistrationQuery,
};
