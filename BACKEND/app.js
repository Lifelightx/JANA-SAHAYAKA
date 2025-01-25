require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors=require('cors');
const cookieParser=require('cookie-parser');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
  
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
