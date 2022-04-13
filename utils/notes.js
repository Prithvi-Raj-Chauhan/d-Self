const fs = require("fs");
const path = require("path");
const notes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/notes.json")).toString()
)["notes"];

module.exports = notes;
