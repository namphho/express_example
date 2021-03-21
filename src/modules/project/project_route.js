let express = require('express');
let router = express.Router();
let Project = require('./project_model')
let respHandler = require('../../commons/express_utils')
let {simpleSuccessResp, errorResp} = require('../../commons/response_apis')
let _ = require('../../commons/response')

// define the home page route
router.get('/', function (req, res) {
    let project = new Project('name', 'hoang nam', 'email@gmail.com')
    let result = simpleSuccessResp(project)
    respHandler.responseSuccessData(res, result)
})

module.exports = router