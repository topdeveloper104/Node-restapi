const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mpdb');
// const db = mongoose.connection;

Model = require('../models/model');

router.get('/', (rep, res) => {
  res.send('api works!');
})

// router.get('*', function(req, res) {
//     res.sendfile('./public/views/index.html');
// })

router.get('/models', function(req, res) {
    Model.getModels(function(err, models) {
        if (err) {
            throw err;
        }
        res.json(models);
    });
});

router.get('/models/:_id', function(req, res) {
    Model.getModelById(req.params._id, function(err, model) {
        if (err) {
            throw err;
        }
        res.json(model);
    });
});

router.post('/models', function(req, res) {
    const model = req.body;
    Model.addModel(model, function(err, model) {
        if (err) {
            throw err;
        }
        res.json(model);
    });
});

router.put('/models/:_id', function(req, res) {
    const id = req.params._id;
    const model = req.body;
    Model.updateModel(id, model, {}, function(err, model) {
        if (err) {
            throw err;
        }
        res.json(model);
    });
});

router.delete('/models/:_id', function(req, res) {
    const id = req.params._id;
    Model.removeModel(id, function(err, model) {
        if (err) {
            throw err;
        }
        res.json(model);
    });
});

router.get('/search', function(req, res) {
    const query = req.query.key;
    Model.search(query, function(err, model) {
        if(err) {
            throw err;
        }
        res.json(model);
    })
});

module.exports = router;