const express = require('express');
const router = express.Router();

// import controller for index
const accessController = require('../controllers/access.controller');

router.get('/login', accessController.loginForm );
router.post('/login', accessController.login );
router.get('/register', accessController.registerForm );
router.post('/register', accessController.register );

router.get('/logout', accessController.logout );

module.exports = router;
