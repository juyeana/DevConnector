const express = require('express');

// I want only Router from the express nothing else.
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'Posts work' }));

module.exports = router;
