const express = require('express');
const photosRouter = require('./routers/photos');
const cors = require('cors');
require('./db/connection');

const app = express();
app.use(cors());
app.use(photosRouter);

const PORT = 3300;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
