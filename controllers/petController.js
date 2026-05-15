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

exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        res.status(200).json(updatedPet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Pet deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};