//https://hub.packtpub.com/building-movie-api-express/

const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actors');
const movies = require('./routers/movies');
const app = express();
app.listen(8085);
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/addmovies', actors.addMovie);
app.post('/actors/:id/delmovies', actors.deleteMovie);
app.delete('/actors/:id', actors.deleteOne);



//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.post('/movies/:id/addActor', movies.addActor);
app.post('/movies/:id/delActor', movies.deleteActor);
app.get('/movies/:id', movies.getOne);
app.delete('/movies/:id',movies.deleteOne);
app.put('/movies/:id', movies.updateOne);
app.put('/movies', movies.updateMany);
app.get('/movies/byYear/:year1/:year2',movies.showByYear);
