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

// mongoose.connect("mongodb+srv://tbirla210:tarun@5846@cluster0.bi9tgwv.mongodb.net/userDBData", { useNewUrlParser: true, useUnifiedTopology: true ,
// serverSelectionTimeoutMS: 5000, // Set to a higher value if needed
// socketTimeoutMS: 45000, })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(error => console.error(error));

// mongoose.connect("mongodb+srv://tarunbirla2018:tarun5846@cluster0.fqiztuu.mongodb.net/userDb").
// then(() => console.log("Connection successfull")).
//     catch((err) => {
//         console.log(err)
//     });
const uri = 'mongodb+srv://tarunbirla:tarun5846@tarun.oa1ajpo.mongodb.net/userDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});
app.get("/", (req, res) => { res.send("wellcome- hello h- mongobd"); });
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', latestRoutes);
app.use('/api', blogRoutes);
app.use('/api', contactRoutes);

app.use(errorHandler);

module.exports = app;
