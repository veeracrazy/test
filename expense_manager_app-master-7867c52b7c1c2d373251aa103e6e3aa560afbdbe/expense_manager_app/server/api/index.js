const router = require('express').Router();

// router handler to call given route
router.use('/expense', require('./modules/expense'));

// exporting router to handle request
module.exports = router;