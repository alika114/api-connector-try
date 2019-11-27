const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');

/*
//learn purpose
const myOwnMiddleWare = (req,res,next) => {
    console.log("middleware function");
    next();
};*/
//Routes file
const postRoutes = require('./routes/post');

//middleware 
app.use(morgan("dev"));
//app.use(myOwnMiddleWare);
app.use(bodyParser.json());

app.use('/',postRoutes);

const port = 8080;
app.listen(port, ()=>{
    console.log(`A node JS API is listening in the port :${port}`);
});