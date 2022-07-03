import console from 'node-color-log';
import express from "express";
import apiRouter from "./api/router";
import appRouter from "./app/router";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.use( "/api/", apiRouter);
app.use( "/", appRouter);

// start the Express server
app.listen( port, () => {
    console.info( `server started at http://localhost:${ port }` );
    
} );