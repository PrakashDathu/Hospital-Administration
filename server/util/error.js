class ErrorHandler extends Error {
    constructor(obj) {
        super();
        this.statusCode = obj.statusCode;
        this.message = obj.message;
        this.errors = obj.errors;
    }
}
const handleError = (err, res) => {
    const { statusCode, message, errors } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        errors
    });
};
module.exports = {
    ErrorHandler,
    handleError
};