const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername, getPublicRoutinesByUser, getAllRoutinesByUser, getUser } = require('../db');
const { requireUser } = require('./utils');
const SALT_COUNT = 10;
const { JWT_SECRET = 'neverTell' } = process.env;

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  console.log("req.body: ",req.body)//added
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password'
    });
  }

  try {
    const user = await getUser({username, password});
    if(!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  console.log("req.body: ",req.body)//added
  try {
    const {username, password} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!'
      });
    } else {
      const user = await createUser({
        username,
        password
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error)
  }
})

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res, next) => {
  console.log("---starting route---")
  try {
    const {username} = req.params;
    const user = await getUserByUsername(username);
    if(!user) {
      next({
        name: 'NoUser',
        message: `Error looking up user ${username}`
      });
    } else if(req.user && user.id === req.user.id) {
      const routines = await getAllRoutinesByUser({username: username});
      res.send(routines);
    } else {
      const routines = await getPublicRoutinesByUser({username: username});
      res.send(routines);
    }
  } catch (error) {
    next(error)
  }
})
module.exports = router;
