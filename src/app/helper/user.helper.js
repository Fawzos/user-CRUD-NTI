const dealWithData = require("./dealWithJSON.helper");
const fName = process.env.fileName;
class User {
  static showAll = () => {
    const users = dealWithData.readDataFromJSON(fName);
    return users;
  };

  static showSingle = (userId) => {
    const allUsers = dealWithData.readDataFromJSON(fName);
    const user = allUsers.find((u) => u.id == userId);
    user.addresses.forEach((address, index) => {
      (address.userId = userId), (address.id = index);
    });
    return user;
  };

  static addAddress = (userId, data) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((user) => user.id == userId);
      if (userIndex == -1) throw new Error();
      allUsers[userIndex].addresses.push(data);
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  };
  static add = (data) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      allUsers.push(data);
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  };

  static edit = (userId, newData) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((u) => u.id == userId);
      const user = {
        id: userId,
        ...newData,
        addresses: allUsers[userIndex].addresses,
      };
      allUsers[userIndex] = user;
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  };
  static deleteUser(userId) {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((user) => user.id == userId);
      if (userIndex == -1) throw new Error();
      allUsers.splice(userIndex, 1);
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  }
  static deleteAddress = (userId, addressId) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((user) => user.id == userId);
      if (userIndex == -1) throw new Error();
      allUsers[userIndex].addresses.splice(addressId, 1);
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  };
  static getAddressDetails = (userId, addressId) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((user) => user.id == userId);
      if (userIndex == -1) throw new Error();
      return allUsers[userIndex].addresses[addressId];
    } catch (e) {
      return false;
    }
  };
  static editAddressLogic = (userId, addressId, newData) => {
    try {
      const allUsers = dealWithData.readDataFromJSON(fName);
      const userIndex = allUsers.findIndex((user) => user.id == userId);
      if (userIndex == -1) throw new Error();
      allUsers[userIndex].addresses[addressId] = newData;
      dealWithData.writeDataToJSON(fName, allUsers);
      return true;
    } catch (e) {
      return false;
    }
  };
}

module.exports = User;
