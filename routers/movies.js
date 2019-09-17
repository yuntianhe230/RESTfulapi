var Actor = require('../models/Actor');
var Movie = require('../models/Movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate("actors").exec(function(err,actors){
            if (err) return res.status(400).json(err);
            if (!actors) return res.status(404).json();

            res.json(actors);
        })
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.status(200).json({"msg":"deleted sucessfully!!"});
        });
    },
    deleteActor: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({
                _id: req.body.id
            }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                
                movie.actors.remove(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    addActor: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({
                _id: req.body.id
            }, function (err,actor) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    showByYear:function (req, res) {
        let year1=req.body.year1;
        let year2=req.body.year2;
        let query={year:{$gte:year2,$lte:year1}};
        Movie.find(query).exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },
    updateMany: function (req, res) {
        let query={year:{$gte:1995}};
        let update={$inc:{year:7}}
        Movie.find(query).update(update).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
};