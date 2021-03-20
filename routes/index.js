const router = require('express').Router()
const flickerApi = require('./FlickerAPI')

router.use('/', flickerApi)

module.exports = router