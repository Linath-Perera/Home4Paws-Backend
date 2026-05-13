const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');


router.post('/', petController.addPet);
router.get('/', petController.getAllPets);

module.exports = router;