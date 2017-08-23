const mongoose = require('mongoose');

// Model Schema
const eventmodelSchema = mongoose.Schema({
    modelname: {
        type: String,
        required: true
    },
    event: {
      type: String,
      required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Evemodel = module.exports = mongoose.model('Eventmodel', eventmodelSchema);

// Get Models
module.exports.getModels = function(callback, limit) {
    Evemodel.find(callback).limit(limit);
}

// Get Model
module.exports.getModelById = function(id, callback) {
    Evemodel.findById(id, callback);
}

// Add Model
module.exports.addModel = function(evemodel, callback) {
    Evemodel.create(evemodel, callback);
}

// Update Model
module.exports.updateModel = function(id, evemodel, options, callback) {
    const query = { _id: id };
    const update = {
        modelname: evemodel.modelname,
        event: evemodel.event        
    };
    Evemodel.findOneAndUpdate(query, update, options, callback);
}

// Delete Model
module.exports.removeModel = function(id, callback) {
    const query = { _id: id };
    Evemodel.remove(query, callback);
}

module.exports.search = function(query, callback) {  
    const q1 = {$or: [{modelname: eval(('/' + query + '/'))}, {event: eval(('/' + query + '/'))}]};
    Evemodel.find(q1, callback);
}