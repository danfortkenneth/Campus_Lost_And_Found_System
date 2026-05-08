const Claim = require('../models/Claim');
const Item = require('../models/Item'); // Siguraduhing naka-import ang Item model


exports.submitClaim = async (req, res) => {
    try {
        const { itemId, claimerName, claimerId, proof } = req.body;

        if (!itemId || !claimerName || !claimerId || !proof) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required claim fields." 
            });
        }

        const newClaim = await Claim.create({
            itemId,
            claimerName,
            claimerId,
            proof,
            status: 'pending'
        });

        res.status(201).json({ success: true, data: newClaim });
    } catch (err) {
        console.error("Submit Claim Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate('itemId');
        res.json({ success: true, data: claims });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.updateClaimStatus = async (req, res) => {
    try {
        const { status } = req.body; 
        
        // Hanapin at i-update ang claim
        const updatedClaim = await Claim.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true } 
        );

        if (!updatedClaim) {
            return res.status(404).json({ success: false, message: "Claim not found" });
        }

       
        if (status === 'approved') {
            await Item.findByIdAndUpdate(updatedClaim.itemId, { 
                status: 'claimed', 
                isVerified: true 
            });
        }

        res.json({ 
            success: true, 
            message: `Claim successfully ${status} and item marked as recovered!`, 
            data: updatedClaim 
        });
    } catch (err) {
        console.error("Update Status Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.getUserClaims = async (req, res) => {
    try {
        const { userId } = req.params;
        const claims = await Claim.find({ claimerId: userId })
            .populate('itemId')
            .sort({ createdAt: -1 });
            
        res.json({ success: true, data: claims });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};