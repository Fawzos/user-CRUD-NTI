const userHelper = require("../helper/user.helper");
class User {
  static addUser = (req, res) => {
    if (
      req.query.name &&
      req.query.email &&
      req.query.age &&
      req.query.password
    ) {
      const user = { ...req.query, id: Date.now(), addresses: [] };
      userHelper.add(user);
      return res.redirect("/");
    }
    res.render("addUser", { pageTitle: "Add User" });
  };

  static addUserPost = (req, res) => {
    res.render("addUser", { pageTitle: "Add User" });
  };

  static addUserPostLogic = (req, res) => {
    const user = { ...req.body, id: Date.now(), addresses: [] };
    userHelper.addUser(user);
    res.redirect("/");
  };
  static showAllUsers = (req, res) => {
    const users = userHelper.showAll();
    res.render("allUsers", {
      pageTitle: "Show All Users",
      users,
      isEmpty: users.length == 0 ? true : false,
    });
  };

  static showSingleUser = (req, res) => {
    const user = userHelper.showSingle(req.params.id);
    res.render("showSingle", {
      pageTitle: "Show Single User",
      user,
      ifFound: user ? true : false,
      hasAddress: user.addresses.length == 0 ? false : true,
    });
  };

  static editSingleUser = (req, res) => {
    const user = userHelper.showSingle(req.params.id);
    res.render("editUser", {
      pageTitle: "Edut Single User",
      user,
      ifFound: user ? true : false,
    });
  };

  static editSingleUserLogic = (req, res) => {
    const isUpdated = userHelper.edit(req.params.id, req.body);
    if (isUpdated) res.redirect("/");
    else res.send("Error in update");
  };

  static deleteUser = (req, res) => {
    const isDeleted = userHelper.deleteUser(req.params.id);
    isDeleted ? res.redirect("/") : res.send("Error on deleting user");
  };

  static addAddress = (req, res) => {
    res.render("addAddress", { pageTitle: "Add Address" });
  };

  static addAddressLogic = (req, res) => {
    const status = userHelper.addAddress(req.params.id, req.body);
    if (status) return res.redirect(`/showSingle/${req.params.id}`);
    res.send("Invalid User ID");
  };
  static deleteAddress = (req, res) => {
    const addressId = req.params.addressId;
    const userId = req.params.userId;
    userHelper.deleteAddress(userId, addressId);
    res.redirect(`/showSingle/${userId}`);
  };
  static editAddress = (req, res) => {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const address = userHelper.getAddressDetails(userId, addressId);
    res.render("editAddress", { pageTitle: "Edit Address", address });
  };
  static editAddressLogic = (req, res) => {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    userHelper.editAddressLogic(userId, addressId, req.body);
    res.redirect(`/showSingle/${userId}`);
  };
}

module.exports = User;
