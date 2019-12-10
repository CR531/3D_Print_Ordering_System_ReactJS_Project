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
    email_notify_check: {
        type: Boolean
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
        type: Date
    },
    grams_used: {
        type: String
    },
    amount_due: {
        type: String
    },
    pickup_date: {
        type: Date
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
        type: Date
    },
    job_completed_email_sent: {
        type: Boolean
    },
    job_delivered_check: {
        type: Boolean
    },
    job_delivered_GA: {
        type: String
    },
    job_delivery_date: {
        type: Date
    },
    job_feedback_email_sent: {
        type: Boolean
    },
    status: {
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