var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/authentication.middleware');
/* GET users listing. */
const usersController = require('../controllers/user.controller')
router.get('/', usersController.home);
router.get('/me', authMiddleware.validToken, usersController.me);
router.put('/me', authMiddleware.validToken, usersController.update);
router.put('/setBuyerBudget/:price', authMiddleware.validToken, usersController.setBuyerBudget)
    //router.put('/me',)

module.exports = router;