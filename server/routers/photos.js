const express = require('express');
const multer = require('multer');
const Photo = require('../model/Photo');

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 10000000 // configure max file size limit - 10MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) { // configure file types
      cb(new Error('file upload error - allowed files jpeg, jpg, png'));
    }
    cb(undefined, true);
  }
});

// get all photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of photos.' });
  }
});

// upload photo
router.post(
  '/upload',
  upload.single('image'),
  async (req, res) => {
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;

      await photo.save();
      res.status(201).send({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: 'Error uploading file'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

// get photo by id
router.get('/photo/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});

// delete photo
router.delete('/photo/:id', async (req, res) => {
  try {
    const result = await Photo.remove({ _id: req.params.id });
    // res.set('Content-Type', 'image/jpeg');
    res.send(result);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});

module.exports = router;
