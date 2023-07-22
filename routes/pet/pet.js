const express = require('express');

const ctrl = require('../../controllers/pet');
const { addSchema } = require('../../models/pet');

const { validateBody, authenticate, isValidId } = require('../../middlewares');

const router = express.Router();

router.post('/', authenticate, validateBody(addSchema), ctrl.addPet);

router.delete('/:id', authenticate, isValidId, ctrl.deletePetById);

module.exports = router;
