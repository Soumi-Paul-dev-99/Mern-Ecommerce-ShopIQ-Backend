const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  res.send("Correct");
});

module.exports = {
  createProduct,
};
