const Pet = require('../models/Pet');


exports.addPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};