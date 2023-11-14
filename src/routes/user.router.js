const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get("/find/:id", userController.find);
router.get("/findAll", userController.findAllUsers);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/login", userController.login);
router.get("/verificarToken", userController.verificarToken)


module.exports = router;

