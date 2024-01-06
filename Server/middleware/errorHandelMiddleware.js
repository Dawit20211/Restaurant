// it will be called if no other middleware has handeled the request
const notFoundError = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    let statusCode =  res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
    
    // when we pass in a wrong object id in postman we get cast error which returns a html response we dont want that
    // rather than returning a html response it will return a cutom error message from below     
    
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        message = `item not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "development" ? error.stack : 'null'
    })
}

export { errorHandler, notFoundError}
