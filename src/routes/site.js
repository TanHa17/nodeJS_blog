const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/SiteController');

router.use('/search', newsController.search);
router.use('/', newsController.home);

module.exports = router;
