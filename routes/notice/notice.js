const express = require('express');

const ctrl = require('../../controllers/notice');
const { addSchema } = require('../../models/notice');

const { validateBody, authenticate, isValidId } = require('../../middlewares');

const router = express.Router();

router.post('/', authenticate, validateBody(addSchema), ctrl.addNotice);

// router.delete('/:id', authenticate, isValidId, ctrl.deletePetById);

// router.get('/', authenticate, ctrl.getPets);

module.exports = router;
