import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import createToken from '../utils/createToken.js'


// description : authorize the user and get token
// route : POST /api/users/login
// access : Public
const authUser = asyncHandler( async (req, res) => {

    const {email, password } = req.body;

    const user = await User.findOne({ email: email })

    if(user && (await user.verifyPassword(password))){

        createToken(res, user._id);
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else {
        res.status(401);
        throw new Error('Invalid email or password please try agian'); // dont want to let them know which one is wrong gives extra work for any hackers
    }
})

// description : Register User
// route : POST /api/users/register
// access : Public
const resgisterUser = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    const user = await User.findOne({ email : email})

    if(user){
        res.status(404);
        throw new Error ('User is already registered, try login in.')
    }

    const newUser = await User.create({
        name, email, phoneNumber, password
    })

    if (newUser)
    {
     createToken(res, user._id);
 
     res.status(201).json({
         _id: user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
     })
    }else{
     res.status(400);
     throw new Error('Provide valid data')
    }        
})

// description : Logout User and clear the coockie 
// route : POST /api/users/logout
// access : Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly:true,
        expires: new Date (0)
        });
        res.status(200).json({meesage: 'Logged out!'})
})

// description : Get the user profile
// route : GET /api/users/profile
// access : Private
const getUserPofile = asyncHandler(async (req, res) => {
    res.json('user profile')
})

// description : update the user profile 
// route : PUT /api/users/profile
// access : Private
const updateUserProfile = asyncHandler (async (req,res) => {
    res.json('update user profile')
})

// description : Get all users 
// route : GET /api/users
// access : Private - only for Admins
const getUsers = asyncHandler(async (req,res) => {
    res.json('get all users')
})


// description : Get a single user by their id 
// route : GET /api/users/:id
// access : Private - only Admins
const getUserById = asyncHandler(async (req,res) => {
    res.json('get user by id')
})


//@desc   Update user by their id 
//@route  PUT /api/users/:id
//access  Private - only Admins 
const updateUser = asyncHandler(async (req, res)=>{
    res.json('update user')

})

// description : Delete a user by id 
// route : DELETE /api/users/:id
// access : Private - only Admins
const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await User.deleteOne({ _id: id });

    if (user.deletedCount > 0) {
        res.status(200).send('User is deleted!');
    } else {
        res.status(404).send('User not found');
    }
});

export {
    authUser,
    resgisterUser,
    logoutUser,
    getUserPofile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser,
}