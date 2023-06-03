const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    mode: String,
    speciality: String,
    desc: String,
    userId: String,
    status: String
})

const consultData = new mongoose.model('consultData',consultSchema);
module.exports = consultData;