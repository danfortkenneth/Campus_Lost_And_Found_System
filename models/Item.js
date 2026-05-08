const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    dateFound: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['found', 'lost', 'claimed'], 
        default: 'found' 
    },
    isVerified: { type: Boolean, default: false },
    reportedBy: { type: String, required: true }, // Name ng user
    studentId: { type: String, required: true }, // ID ng reporter
    image: { type: String } // URL or Base64 string ng picture
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);