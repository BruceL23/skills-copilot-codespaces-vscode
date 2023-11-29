//create web server
var express = require('express');
var router = express.Router();
//import the model
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var mongoose = require('mongoose');
//get all comments
router.get('/', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comments);
        }
    });
});
//get all comments for a post
router.get('/post/:id', function(req, res){
    Comment.find({post: req.params.id}, function(err, comments){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comments);
        }
    });
});
//get all comments for a user
router.get('/user/:id', function(req, res){
    Comment.find({user: req.params.id}, function(err, comments){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comments);
        }
    });
});
//get a comment by id
router.get('/:id', function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comment);
        }
    });
});
//create a comment
router.post('/', function(req, res){
    var comment = new Comment({
        user: req.body.user,
        post: req.body.post,
        text: req.body.text,
        date: req.body.date
    });
    comment.save(function(err, comment){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comment);
        }
    });
});
//update a comment
router.put('/:id', function(req, res){
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, comment){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comment);
        }
    });
});
//delete a comment
router.delete('/:id', function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err, comment){
        if(err){
            res.status(500).send('Error');
        }else{
            res.send(comment);
        }
    });
});