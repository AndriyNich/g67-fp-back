const express = require('express');

const ctrl = require('../../controllers/notice');
const { addSchema } = require('../../models/notice');

const {
  validateBody,
  authenticate,
  isValidId,
  authenticateUpp,
  upload,
} = require('../../middlewares');

const router = express.Router();

router.post(
  '/',
  authenticate,
  upload.single('avatar'),
  validateBody(addSchema),
  ctrl.addNotice
);

router.patch(
  '/:id/users',
  authenticate,
  isValidId,
  ctrl.addNoticeByIdToUserFavorite
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteNoticeById);

router.delete(
  '/:id/favorites/',
  authenticate,
  isValidId,
  ctrl.deleteFavoriteById
);

router.get('/', authenticateUpp, ctrl.getList);

router.get('/favorites', authenticate, ctrl.getFavoriteListByUserId);

router.get('/users', authenticate, ctrl.getNoticeListByUserId);

router.get('/:id', authenticateUpp, ctrl.getNoticeById);

module.exports = router;
