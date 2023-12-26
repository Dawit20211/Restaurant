import User from '../models/userModel.js';


const authUser = async (req, res) => {
  res.json('loggin')
}

const resgisterUser = async (req, res) => {
    res.json('registed')
}

const logoutUser = async (req, res) => {
    res.json('logged out')
}


const getUserPofile = async (req, res) => {
    res.json('user profile')
}

const updateUserProfile = async (req,res) => {
    res.json('update user profile')
}

const getUsers = async (req,res) => {
    res.json('get all users')
}

const getUserById = async (req,res) => {
    res.json('get user by id')
}

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
    deleteUser
}


