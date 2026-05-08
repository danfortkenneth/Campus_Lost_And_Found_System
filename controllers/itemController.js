const Item = require('../models/Item');


exports.searchItems = async (req, res) => {
    try {
        const { q, category, status, start, end } = req.query;
        let queryObj = {};

        if (q) {
            queryObj.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }
        
        if (category && category !== "All Categories") {
            queryObj.category = category;
        }

        if (status && status !== "All Status") {
            queryObj.status = status.toLowerCase(); 
        }

        if (start || end) {
            queryObj.dateFound = {};
            if (start) queryObj.dateFound.$gte = new Date(start);
            if (end) queryObj.dateFound.$lte = new Date(end);
        }

        const items = await Item.find(queryObj).sort({ createdAt: -1 });
        res.json({ success: true, count: items.length, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.getMyActivity = async (req, res) => {
    try {
        const activities = await Item.find({ reportedBy: req.user.name }).sort({ createdAt: -1 });
        res.json({ success: true, data: activities });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.addItem = async (req, res) => {
    try {
        const itemData = {
            ...req.body,
            status: req.body.status ? req.body.status.toLowerCase() : 'found',
            reportedBy: req.user.name,
            studentId: req.user.studentId
        };

        const newItem = await Item.create(itemData);
        res.status(201).json({ success: true, data: newItem });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.verifyItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id, 
            { isVerified: true }, 
            { new: true }
        );
        res.json({ success: true, message: "Item verified!", data: item });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};