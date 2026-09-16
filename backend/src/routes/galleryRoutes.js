const express = require('express');
const router = express.Router();
const {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getGallery)
  .post(protect, createGalleryItem);

router.route('/:id')
  .put(protect, updateGalleryItem)
  .delete(protect, deleteGalleryItem);

module.exports = router;
