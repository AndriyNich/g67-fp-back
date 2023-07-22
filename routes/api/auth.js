const express = require('express');

const ctrl = require('../../controllers/auth');
const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require('../../models/user');

const { validateBody, authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrl.register);

router.post('/login', validateBody(loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', validateBody(updateSchema), authenticate, ctrl.updateUser);

module.exports = router;
