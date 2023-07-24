const express = require('express');

const ctrl = require('../../controllers/notice');
const { addSchema } = require('../../models/notice');

const {
  validateBody,
  authenticate,
  isValidId,
  authenticateUpp,
} = require('../../middlewares');

const router = express.Router();

router.post('/', authenticate, validateBody(addSchema), ctrl.addNotice);

router.patch(
  '/:id/users',
  authenticate,
  isValidId,
  ctrl.addNoticeByIdToUserFavorite
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteNoticeById);

router.get('/', authenticateUpp, ctrl.getList);

router.get('/:id', authenticateUpp, ctrl.getNoticeById);

module.exports = router;
