const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');


router.post('/submit', claimController.submitClaim);
router.get('/all', claimController.getAllClaims);
router.patch('/update-status/:id', claimController.updateClaimStatus);
router.get('/user/:userId', claimController.getUserClaims);

module.exports = router;