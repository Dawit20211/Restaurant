const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const createToken = require("../utils/createToken.js");

// route : POST /api/users/login
// access : Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.verifyPassword(password))) {
    createToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password please try agian"); // dont want to let them know which one is wrong gives extra work for any hackers
  }
});

// route : POST /api/users/register
// access : Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  if (!name || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  //console.log(req.body);

  const user = await User.findOne({ email: email });
  
  //console.log(user);

  if (user) {
    res.status(404);
    throw new Error("User is already registered, try login.");
  }

  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    password,
  });
   // console.log('Newly registered user:', newUser);

  // if (newUser) {
  //   createToken(res, newUser._id);

  //   res.status(200).json({
  //     _id: newUser._id,
  //     name: newUser.name,
  //     email: newUser.email,
  //     isAdmin: newUser.isAdmin,
  //   });

  if (newUser) {
    try {
      createToken(res, newUser._id);
    } catch (error) {
      console.error('Error creating token:', error);
      return res.status(500).json({ message: 'Error creating token' });
    }
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(500);
    throw new Error("Provide valid data");
  }
});

// route : POST /api/users/logout
// access : Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out!" });
});

// route : GET /api/users/profile
// access : Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("could not find user");
  }
});

// route : PUT /api/users/profile
// access : Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const latestUserInfo = await user.save();

    res.status(200).json({
      _id: latestUserInfo._id,
      name: latestUserInfo.name,
      email: latestUserInfo.email,
      phoneNumber: latestUserInfo.phoneNumber,
      isAdmin: latestUserInfo.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("could not find user");
  }
});

// route : GET /api/users
// access : Private - only for Admins
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});

  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(404);
    throw new Error("no users was found");
  }
});

// route : GET /api/users/:id
// access : Private - only Admins
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("user was not found");
  }
});


//route  PUT /api/users/:id
//access  Private - only Admins
const updateUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// route : DELETE /api/users/:id
// access : Private - only Admins
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404);
    throw new Error("use not deleted");
  }
});

module.exports =  {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
};
