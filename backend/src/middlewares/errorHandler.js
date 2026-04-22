function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({ message: "Undefined system error." });
}

module.exports = errorHandler;