const express = require('express');
const cors = require('cors');
const {petRouter} = require('./routes/pet.routes')

const port = 8000;

require('./config/mongoose.config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pets',petRouter)

app.listen(port, () =>
console.log (`Listening on the port ${port} for Request to Respond to`)
);