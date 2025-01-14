const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cloudinary = require('./util/cloudinary');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());


//Handling potential CORS errors
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  next();
})

app.use('/api/places', placesRoutes); 
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file && req.file.path) {
      
      const publicId = req.file.path.split('/').slice(-1)[0].split('.')[0];

      cloudinary.uploader.destroy(publicId, (err, result) => {
          if (err) {
              console.error('Failed to delete file from Cloudinary:', err);
          } else {
              console.log('File deleted from Cloudinary:', result);
          }
      });
  }
  
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yi7n9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`Connected to database and listening on port ${process.env.PORT}`)
    })
    .catch(err => {
        console.log(err)
    })

