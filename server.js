const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();
require('./config/connect');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// Serve frontend static files (index.html at project root) with no-cache
app.use(express.static(path.join(__dirname), { etag: false, maxAge: 0 }));

// Send index.html for root route (helps when opening http://localhost:PORT)
app.get('/', (req, res) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));