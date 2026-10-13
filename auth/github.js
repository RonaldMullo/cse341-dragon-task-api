const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const required = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'SESSION_SECRET'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Missing OAuth environment variables: ${missing.join(', ')}`);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://cse341-dragon-task-api.onrender.com/auth/github/callback',
  scope: ['read:user']
}, (accessToken, refreshToken, profile, done) => {
  done(null, { id: profile.id, username: profile.username, displayName: profile.displayName });
}));

module.exports = passport;
