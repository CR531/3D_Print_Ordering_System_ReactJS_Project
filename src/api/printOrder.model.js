const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let PrintOrder = new Schema({
    name: {
        type: String
    },
    wsuid: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    filament_color: {
        type: String
    },
    notes: {
        type: String
    },
    cspace_rep_name: {
        type: String
    },
    order_date: {
        type: String
    },
    grams_used: {
        type: String
    },
    amount_due: {
        type: String
    },
    pickup_date: {
        type: String
    },
    receipt_number: {
        type: String
    },
    remark_notes: {
        type: String
    },
    job_completed_check: {
        type: Boolean
    },
    job_completed_GA: {
        type: String
    },
    job_completion_date: {
        type: String
    },
    job_delivered_check: {
        type: Boolean
    },
    job_delivered_GA: {
        type: String
    },
    job_delivery_date: {
        type: String
    }
}, {
    collection: 'printOrder'
});

module.exports = mongoose.model('printOrder', PrintOrder);