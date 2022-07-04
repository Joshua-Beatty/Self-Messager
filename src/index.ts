import 'dotenv/config' 
import console from 'node-color-log';
import express from "express";
import apiRouter from "./api/router";
import appRouter from "./app/router";
import fs from "fs";

try{
    fs.mkdirSync("./public/files")
} catch {}

//Set up server and default port
const app = express();
const port = process.env.PORT || 8080; 

// import route handlers for the api and for the main app
app.use( "/api/", apiRouter); 
//app.use( "/", appRouter);

app.use(express.static("public"))

// start the Server
app.listen( port, () => {
    console.info( `server started at http://localhost:${ port }` );
    
} );