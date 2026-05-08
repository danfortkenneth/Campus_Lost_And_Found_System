const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController'); // Import ang utak
const { protect } = require('../middleware/auth'); // Import ang bouncer


router.get('/search', itemController.searchItems);


router.get('/my-activity', protect, itemController.getMyActivity);
router.post('/', protect, itemController.addItem);
router.patch('/verify/:id', protect, itemController.verifyItem);

module.exports = router;