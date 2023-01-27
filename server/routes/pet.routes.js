const express = require('express');

const {handleCreatePet,handleViewAllPets,handleViewOnePet,handleUpdatePet,handleDeletePet,handleAddLikes} = require ('../controllers/pet.controller')

const router = express.Router()

router.post ('/',handleCreatePet);
router.get('/',handleViewAllPets);
router.get('/:id',handleViewOnePet);
router.put('/:id',handleUpdatePet);
router.delete('/:id',handleDeletePet);
router.patch('/:id/likes', handleAddLikes);

module.exports = {
    petRouter : router
}
