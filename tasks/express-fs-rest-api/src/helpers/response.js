const sendResponse = (req, res, payload) => {
    const { statusCode = 200, message = "success", data = [] } = payload;
    res.status(statusCode).json({ message, data });
}

const sendErrorResponse = (error, req, res, next) => {
    // if (res.headersSent) {
    //     return next(err)
    // }
    const { statusCode = 500, message = "failure", hints } = error;
    let response = { message };
    if (hints) {
        response.errors = hints;
    }
    res.status(statusCode).json(response);
}

module.exports = { sendResponse, sendErrorResponse };