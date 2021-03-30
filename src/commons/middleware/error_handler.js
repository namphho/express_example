function errorHandler(err, req, res , next) {
    res.status(500)
    res.send({error: err})
}

exports.errorHandler = errorHandler