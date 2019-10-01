const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrementModelID = require('./counter.model');
let PrintOrder = new Schema({
    id: { type: Number, unique: true, min: 1 },
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

PrintOrder.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
module.exports = mongoose.model('printOrder', PrintOrder);