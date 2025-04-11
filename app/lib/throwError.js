const throwError = (message, status) => {
  const err = new Error(message);
  err.statusCode = status;
  throw err;
};

export { throwError };
