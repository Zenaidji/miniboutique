const User = require('../models/users.model').model;
module.exports.home = (_, res) => res.redirect('/user.html');

module.exports.me =
    async(req, res) => {
        const user = await User.findById(req.userId);
        console.log(user);
        console.log(req.userId);
        console.log("test");
        res.status(200).json({ name: user.name, budget: user.budget });
    }

module.exports.update =
    async(req, res) => {
        const id = req.userId
        const updatedData = {...req.body };
        console.log(updatedData);
        const user = await User.findByIdAndUpdate(req.userId,
            updatedData, { new: true });
        res.status(200).json({ name: user.name, userId: id, budget: user.budget });
    }
module.exports.setBuyerBudget =
    async(req, res) => {
        let object = await User.findById(req.userId);
        try {
            object.budget = object.budget - req.params.price; // add details to book
            object = await object.save(); // save modified book
            res.status(201).json(object); // send modified book
        } catch (error) {
            res.status(400).json(error);
        }
    }