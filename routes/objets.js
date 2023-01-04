var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/authentication.middleware');
// import controller for object
const objectController = require('../controllers/objectController');

router.get('/', authMiddleware.validToken, objectController.list);
router.post('/', objectController.listThen);

router.get('/then', objectController.listThen);

router.get('/objectData/:objectId', objectController.objectData);


router.get('/create', objectController.createForm);
router.post('/create', objectController.create);

router.get('/adddetails/:objectId', objectController.addDetailsForm);
router.post('/adddetails/:objectId', objectController.addDetails);

router.put('/buy/:objectId', objectController.buyItem);
router.put('/update/:objectId', objectController.update);

router.get('/delete/:objectId', objectController.deleteObject);


module.exports = router;