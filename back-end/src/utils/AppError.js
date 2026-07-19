class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //Builds error instance on the parent Error class, enables to use this
    this.name = "AppError";
    this.statusCode = statusCode; //assigns statusCode to this error instance's status code
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; //defining error status to be fail or error
    this.isOperational = true; // it means this error is handled error

    Error.captureStackTrace(this, this.constructor); //to capture where the error is originally generated instead of the AppError
  }
}

export default AppError;
