import jwt from 'jsonwebtoken'
import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler';

// for protected routes
const ensureAuthenticated = asyncHandler(async (req, res, next) => {
     
    const token = req.cookies.access_token;
    
    if (token) {
        try {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach the user to the request object (excluding the password)
            req.user = await User.findById(decodedToken.userId).select('-password');
            next();
            
        } catch (error) {
            res.status(401);
            throw new Error('Verification failed');
        }
    } else {
        res.status(401);
        throw new Error('You are not authorized');
    }
});

// authentication middleware for admins
// we check if there is a req.user and that they are an admin, if they are we give access 
const adminOnly = (req, res, next) => {

    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error ('You are not authorised');
    }  
}

export { ensureAuthenticated, adminOnly}