const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be up to 6 characters");
  }

  //check if user existts
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }
  //create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //genrate token
  const token = generateToken(user._id);

  if (user) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: newDate(Date.now() + 1000 * 86400),
      //secure:true,
      //samesite:none,
    });

    //send user data
    res.status(201).json({
  
})
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
};
