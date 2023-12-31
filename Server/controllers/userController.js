import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// description : authorize the user and get token
// route : POST /api/users/login
// access : Public
const authUser = asyncHandler( async (req, res) => {

    const {email, password } = req.body;

    const user = await User.findOne({ email: email })

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

// description : Register User
// route : POST /api/users/register
// access : Public
const resgisterUser = async (req, res) => {
    res.json('registed')
}

// description : Logout User and clear the coockie 
// route : POST /api/users/logout
// access : Private
const logoutUser = async (req, res) => {
    res.json('logged out')
}

// description : Get the user profile
// route : GET /api/users/profile
// access : Private
const getUserPofile = async (req, res) => {
    res.json('user profile')
}


// description : update the user profile 
// route : PUT /api/users/profile
// access : Private
const updateUserProfile = async (req,res) => {
    res.json('update user profile')
}

// description : Get all users 
// route : GET /api/users
// access : Private - only for Admins
const getUsers = async (req,res) => {
    res.json('get all users')
}


// description : Get a single user by their id 
// route : GET /api/users/:id
// access : Private - only Admins
const getUserById = async (req,res) => {
    res.json('get user by id')
}


//@desc   Update user by their id 
//@route  PUT /api/users/:id
//access  Private - only Admins 
const updateUser = (async (req, res)=>{
    res.json('update user')

})

// description : Delete a user by id 
// route : DELETE /api/users/:id
// access : Private - only Admins
const deleteUser = async (req,res) => {
    res.json('delete user')
}

export {
    authUser,
    resgisterUser,
    logoutUser,
    getUserPofile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
}