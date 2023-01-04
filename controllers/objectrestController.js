const Objects = require('../models/object.model').model;

// define a REST like API available for route /objects

// controller for GET /
const allObjects =
    async(req, res) => {
        const allObjects = await Objects.find();
        res.status(200).json(allObjects);
    }


// controller for GET /:objectId
const getObject =
    async(req, res) => {
        const object = await Objects.findById(req.params.objectId);
        res.status(200).json(object);
    }

// controller for POST /
const createObject =
    async(req, res) => {
        const newObjectData = {...req.body };
        const newObject = await Objects.create(newObjectData);
        res.status(201).json(newObject);
    }

// controller for PUT /:objectId
const updateObject =
    async(req, res) => {
        const updatedObjectData = {...req.body };
        const updatedObject = await Object.findByIdAndUpdate(req.params.objectId, updatedObjectData, { new: true });
        res.status(201).json(updatedObject);
    }

// controller for DELETE /:obkectId
const deleteObject =
    async(req, res) => {
        await objects.findByIdAndRemove(req.params.objectId);
        res.status(200).json(null);
    }

module.exports.allObjects = allObjects;
module.exports.getObject = getObject;
module.exports.createObject = createObject;
module.exports.updateObject = updateObject;
module.exports.deleteObject = deleteObject;