const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("mongodb connected"))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);

const PORT =process.env.PORT || 5555;
app.listen(PORT,()=>console.log(`server running at port ${PORT}`));