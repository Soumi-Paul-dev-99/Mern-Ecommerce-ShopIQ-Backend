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
    const { _id, name, email, role } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //secure:true,
      //samesite:none,
    });

    //send user data
    res.status(201).json({ _id, name, email, token });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }
  //check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User Does not exits");
  }

  //user exists , check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //Generate token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 864000),
      //secure:true,
      //samesite:none
    });
    //Send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Successfully Loggout Out" });
});

//Get User
const getuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

//update user

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo
  const updateUser = await user.save();
  res.status(200).json(updateUser);
})

module.exports = {
  registerUser,
  loginUser,
  logout,
  getuser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
