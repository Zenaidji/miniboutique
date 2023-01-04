const express = require('express');
const router = express.Router();

// import controller for books
/**const controller = require('../controllers/objectrestController');

// use different method to provide REST operations
router.get('/', controller.allObjects );
router.get( '/:objectId', controller.getObject );
router.post( '/', controller.createObject );
router.put( '/:objectId', controller.updateObject );
router.delete( '/:objectId', controller.deleteObject );**/

module.exports = router;