const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoute = require('./routes/user.routes')
const postRoute = require('./routes/post.routes')
const messageRoute = require('./routes/message.routes')
const cookieparser =  require('cookie-parser')
const cors = require('cors');

dotenv.config();

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
const  corsOptions  = {
    origin:process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}
app.use(cors(corsOptions));

app.use('/api/user' , userRoute)
app.use('/api/post' , postRoute)
app.use('/api/message' , messageRoute)

app.listen( PORT , ()=>{
    connectDB(),
    console.log("Server start on port : ",PORT )
})
