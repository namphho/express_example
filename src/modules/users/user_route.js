let express = require('express');
let router = express.Router();
let User = require('./user_model')
let respHandler = require('../../commons/express_utils')

// define the home page route
router.get('/', function (req, res) {
    let user = new User('name', 'hoang nam', 'email@gmail.com');
    respHandler.responseSuccessData(res, user);
})

module.exports = router