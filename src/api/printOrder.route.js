const express = require('express');
const printOrderRoutes = express.Router();

let PrintOrder = require('./printOrder.model');

printOrderRoutes.route('/add').post(function (req, res) {
    let printOrder = new PrintOrder(req.body);
    printOrder.save()
        .then(printOrder => {
            res.status(200).json({ 'printOrder': 'printOrder in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

printOrderRoutes.route('/').get(function (req, res) {
    PrintOrder.find(function (err, printOrders) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(printOrders);
        }
    });
});

//Update
printOrderRoutes.route('/update/:id').post(function (req, res) {
    PrintOrder.findById(req.params.id, function (err, printOrder) {
        if (!printOrder)
            res.status(404).send("data is not found");
        else {
            printOrder.name = req.body.name;

            printOrder.save().then(printOrder => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
module.exports = printOrderRoutes;
