const asyncHandler = require("express-async-handler");

// register User

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User ..");
});

module.exports = {
  registerUser,
};
