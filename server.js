const express =  require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/pets', require('./routes/petRoutes'));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Databased  Connected"))
.catch(err => console.error("Conection error:", err));

app.get('/', (req,res) => {
    res.send("Home4Paws API is Working: ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT ,() => console.log(`Server on port ${PORT}`));