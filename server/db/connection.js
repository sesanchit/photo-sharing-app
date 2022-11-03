const mongoose = require('mongoose');

// configure mongo db url
const mongoURL = "mongodb+srv://test:test@tarrifcluster.g55ye.mongodb.net"; 

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
