
const express = require("express")
const app=express();
const bodyparser=require("body-parser");
const router=require("./router/router")
const cors=require("cors");

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the URL of your React app
    credentials: true, // Enable sending cookies from the React app
  }));

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())



app.use("/",router);
app.listen(3002,()=>console.log("server listening at 3002"))

module.exports=app