
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/categories', require('./routes/categories'));
app.use('/tasks', require('./routes/tasks'));

// Main route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Dragon Task API is running',
    project: 'CSE 341 Final Project',
    status: 'success'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error'
  });
});

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await mongodb.initDb();

    app.listen(PORT, () => {
      console.log(`Dragon Task API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
