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
            printOrder.email_notify_check = req.body.email_notify_check;
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
            printOrder.job_completed_email_sent = req.body.job_completed_email_sent;
            printOrder.job_delivered_check = req.body.job_delivered_check
            printOrder.job_delivered_GA = req.body.job_delivered_GA;
            printOrder.job_delivery_date = req.body.job_delivery_date;
            printOrder.job_feedback_email_sent = req.body.job_feedback_email_sent;
            if ((req.body.job_completed_check === true) && (req.body.job_delivered_check === true)) {
                printOrder.status = "Done";
            } else {
                printOrder.status = "Pending";
            }
            printOrder.id = req.body.id;
            printOrder.save().then(printOrder => {
                res.json('update_success');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
printOrderRoutes.route('/delete/:id').get(function (req, res) {
    PrintOrder.findByIdAndRemove({ _id: req.params.id }, function (err, printOrder) {
        if (err) res.json(err);
        else res.json('delete_success');
    });
});

module.exports = printOrderRoutes;
