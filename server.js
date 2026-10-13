
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('./auth/github');
const cors = require('cors');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// General middleware
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  }
}));

// GitHub OAuth configuration
app.use(passport.initialize());
app.use(passport.session());

// Start GitHub login
app.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['read:user']
  })
);

// GitHub OAuth callback
app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failed'
  }),
  (req, res) => {
    res.redirect('/auth/me');
  }
);

// Authentication failure
app.get('/auth/failed', (req, res) => {
  res.status(401).json({
    message: 'GitHub sign-in failed'
  });
});

// Check authentication status
app.get('/auth/me', (req, res) => {
  res.status(200).json({
    authenticated: req.isAuthenticated(),
    user: req.user || null
  });
});

// Logout
app.post('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.clearCookie('connect.sid');

      return res.status(200).json({
        message: 'Signed out successfully'
      });
    });
  });
});

// Swagger documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// API routes - Four collections
app.use('/categories', require('./routes/categories'));
app.use('/tasks', require('./routes/tasks'));
app.use('/projects', require('./routes/projects'));
app.use('/comments', require('./routes/comments'));

// Main route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Dragon Task API is running',
    project: 'CSE 341 Final Project',
    status: 'success'
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
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
    console.error(
      'Database connection failed:',
      error.message
    );

    process.exit(1);
  }
};

startServer();
