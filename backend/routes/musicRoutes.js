const express = require('express');
const router = express.Router();
const { createMusic, getAllMusic, deleteMusic } = require('../controllers/musicControllers');
router.post('/', createMusic);
router.get('/', getAllMusic);
router.delete('/:id', deleteMusic);

module.exports = router;

