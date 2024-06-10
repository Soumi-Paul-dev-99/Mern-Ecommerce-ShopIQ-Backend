const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getuser,
  getLoginStatus,
  updateUser,
  updatePhoto,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getuser);
router.get("/getUser", protect, getuser);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

module.exports = router;
