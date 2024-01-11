const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const latestRoutes = require('./routes/latestRoutes');
const blogRoutes = require('./routes/blogsRoutes');
const contactRoutes =require('./routes/contactRoutes')
const errorHandler = require('./middleware/errorHandler');
const path = require('path');  // Add this line to import 'path' module
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/Api/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect("mongodb+srv://tarunbirla2018:tarun5846@cluster0.fqiztuu.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true ,
// serverSelectionTimeoutMS: 5000, // Set to a higher value if needed
// socketTimeoutMS: 45000, })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(error => console.error(error));

// mongoose.connect("mongodb+srv://tarunbirla2018:tarun5846@cluster0.fqiztuu.mongodb.net/userDb").
// then(() => console.log("Connection successfull")).
//     catch((err) => {
//         console.log(err)
//     });
mongoose.connect("mongodb+srv://tarunbirla2018:tarun5846@cluster0.fqiztuu.mongodb.net/userDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDb connection is successfull");
}).catch((err)=>{
    console.error(`Error connecting to MongoDb ${err}`);
})
app.get("/", (req, res) => { res.send("wellcome mongobd"); });
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', latestRoutes);
app.use('/api', blogRoutes);
app.use('/api', contactRoutes);

app.use(errorHandler);

module.exports = app;
