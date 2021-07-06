const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
