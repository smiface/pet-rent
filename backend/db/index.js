const fs = require("fs");
const path = require("path");

const file = (url) => JSON.parse(fs.readFileSync(path.resolve(__dirname, url)));

const db = {
  activeAuthTokens: file("./activeAuthTokens.json"),
  usersData: file("./usersData.json"),
  cities: file("./cities.json"),
  categories: file("./categories.json"),
  cars: file("./cars.json"),
};

module.exports = { db };
