require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const itemRoutes = require('./routes/items');
const claimRoutes = require('./routes/claims'); 
const authRoutes = require('./routes/auth');

app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes); 
app.use('/api/auth', authRoutes);

// Error Handling para sa JWT Secret (Optional pero maganda para sa debugging)
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET is not defined in .env file! Login will fail.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚀`);
});