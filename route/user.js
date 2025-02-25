const express = require('express');
const router = express.Router();
const register = require('../controller/user/register');
const login = require('../controller/user/login');
const information = require('../controller/user/information');
const {generateToken, authenticate} = require('../middleware/authenticate');

router.post('/auth/register', (req, res) => register.handle(req, res));
router.post('/auth/login', (req, res) => login.handle(req, res));
router.put('/auth/information/:user_id', (req, res) => information.handle(req, res));

module.exports = router;