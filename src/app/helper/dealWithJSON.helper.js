const fs = require("fs");

class DealWithData {
  static readDataFromJSON = (fileName) => {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(`db/${fileName}`));
      if (!Array.isArray(data)) throw new Error();
    } catch (e) {
      data = [];
    }
    return data;
  };

  static writeDataToJSON = (fileName, data) => {
    try {
      fs.writeFileSync(`db/${fileName}`, JSON.stringify(data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

module.exports = DealWithData;
