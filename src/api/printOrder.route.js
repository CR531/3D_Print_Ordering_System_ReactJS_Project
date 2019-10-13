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

// Defined edit route
printOrderRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    PrintOrder.findById(id, function (err, printOrder) {
        res.json(printOrder);
    });
});

//  Defined update route
printOrderRoutes.route('/update/:id').post(function (req, res) {
    PrintOrder.findById(req.params.id, function (err, printOrder) {
        if (!printOrder)
            res.status(404).send("data is not found");
        else {
            printOrder.name = req.body.name;
            printOrder.wsuid = req.body.wsuid;
            printOrder.phone = req.body.phone;
            printOrder.email = req.body.email;
            printOrder.filament_color = req.body.filament_color;
            printOrder.notes = req.body.notes;
            printOrder.cspace_rep_name = req.body.cspace_rep_name;
            printOrder.order_date = req.body.order_date;
            printOrder.grams_used = req.body.grams_used;
            printOrder.amount_due = req.body.amount_due;
            printOrder.pickup_date = req.body.pickup_date;
            printOrder.receipt_number = req.body.receipt_number;
            printOrder.remark_notes = req.body.remark_notes;
            printOrder.job_completed_check = req.body.job_completed_check;
            printOrder.job_completed_GA = req.body.job_completed_GA;
            printOrder.job_completion_date = req.body.job_completion_date;
            printOrder.job_delivered_check = req.body.job_delivered_check
            printOrder.job_delivered_GA = req.body.job_delivered_GA;
            printOrder.job_delivery_date = req.body.job_delivery_date
            printOrder.id = req.body.id;

            printOrder.save().then(printOrder => {
                if (res.status(200)) {
                    res.status(200).json({ 'printOrder': 'Data Updated Successfully.' });
                }
                if (res.status(400)) {
                    res.status(400).json({ 'printOrder': 'Unable to Update the Data. Please try again.' });
                }
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

module.exports = printOrderRoutes;
