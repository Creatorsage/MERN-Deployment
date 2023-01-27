const {Pet} = require('../models/pet.model')

const handleCreatePet = (req,res) => {
    Pet.create(req.body)
        .then (data => {
            console.log(data)
            return res.json(data)
        }).catch (err => {
            console.log(err);
            return res.status(400).json(err);
        })
}

const handleViewAllPets = async (req,res) => {
    const pets = await Pet.find();
    return res.json (pets)
}

const handleViewOnePet = async (req,res) => {
    const pet = await Pet.findById(req.params.id)
    return res.json(pet)
}

const handleUpdatePet = async (req,res) => {
    try {
        const updatedpet = await Pet.findByIdAndUpdate(req.params.id, req.body,{
            runValidators : true,
        })
        return res.json(updatedpet)
    }catch(error){
        return res.status(400).json(error)
    }
}

const handleDeletePet = async (req,res) => {
    const deletedpet = await Pet.findByIdAndDelete(req.params.id)
    return res.json (deletedpet)
}

const handleAddLikes = async (req,res) => {
    try {
    const pet = await Pet.findById(req.params.id);
    pet.likes += 1;
    const likedPet = await pet.save();
    return res.json(likedPet);
    } catch (error) {
    return res.status(400).json(error);
    }
    }

module.exports = {handleCreatePet,handleViewAllPets,handleViewOnePet,handleUpdatePet,handleDeletePet, handleAddLikes} 

