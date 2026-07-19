//this file to handle global error

export const globalErrorHandler = (err, req, res, next) => {
  // create copy of error object
  let error = {
    ...err,
    statusCode: err.statusCode || 500,
    status: err.status || "error",
    message: err.message,
    name: err.name,
  };

  //Send the normalized response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    //include error stack only in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/* Reference
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign({}, err);
  error.message = err.message; 

  // Intercept and translate specific stack errors
  if (err.name === 'ZodError') error = handleZodError(error);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
  
  // Prisma errors usually have a code starting with 'P'
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    error = handlePrismaError(error);
  }

  // Send the normalized response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    // Include stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

*/
