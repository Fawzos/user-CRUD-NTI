const router = require("express").Router();
const userController = require("../app/controller/user.controller");

router.get("/", userController.showAllUsers);
router.get("/addUser", userController.addUser);
router.post("/addUserPost", userController.addUserPost);
router.get("/showSingle/:id", userController.showSingleUser);
router.get("/addAddress/:id", userController.addAddress);
router.post("/addAddress/:id", userController.addAddressLogic);
router.get("/editUser/:id", userController.editSingleUser);
router.post("/editUser/:id", userController.editSingleUserLogic);
router.get("/deleteUser/:id", userController.deleteUser);
router.get("/editAddress/:userId/:addressId", userController.editAddress);
router.post("/editAddress/:userId/:addressId", userController.editAddressLogic);
router.get("/deleteAddress/:userId/:addressId", userController.deleteAddress);
module.exports = router;
