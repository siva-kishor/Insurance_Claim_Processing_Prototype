//this file to handle global error
//  Import Error Handling Helper Functions
import { handleZodError } from "../utils/handleZodError.js";
import { handlePrismaError } from "../utils/handlePrismaError.js";
import AppError from "../utils/AppError.js";

// JWT Auth Errors
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

export const globalErrorHandler = (err, req, res, next) => {
  //Check if the err is instance of AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  let error = err;

  //Dispatching Errors to custom types
  if (error.name === "ZodError") {
    error = handleZodError(error);
  } else if (error.name === "JsonWebTokenError") {
    error = handleJWTError();
  } else if (error.name === "TokenExpiredError") {
    error = handleJWTExpiredError();
  } else if (error.code?.startsWith("P")) {
    error = handlePrismaError(error);
  }

  //Normalized Error Response
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

/* Reference

import AppError from '../utils/AppError.js';

// 1. Zod Validation Errors
const handleZodError = (err) => {
  const errors = err.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// 2. Prisma Database Errors
const handlePrismaError = (err) => {
  // P2002: Unique constraint failed
  if (err.code === 'P2002') {
    const target = err.meta?.target || 'field';
    return new AppError(`Duplicate field value entered for ${target}. Please use another value.`, 400);
  }
  // P2025: Record to update/delete not found
  if (err.code === 'P2025') {
    return new AppError('Record not found in the database.', 404);
  }
  return new AppError('Database error occurred.', 500);
};

// 3. JWT Auth Errors
const handleJWTError = () => new AppError('Invalid token. Please log in again.', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again.', 401);


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
