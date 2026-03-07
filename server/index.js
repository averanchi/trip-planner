require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index'); // going to need soon
const errorMiddleware = require('./middlware/error-middleware');


const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);


const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.error('Failed to start server:', e);
        process.exit(1);
    }
}

startServer();