const mongoose = require("mongoose")

const sessionSchema =  mongoose.Schema(
    {
        availablity: {
            type: "String",
            enum: ["Available", "Booked"],
            default: "Available"
        },
        dean: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        day: {
            type: "String",
            enum: ['Thursday', "Friday"],
        },
        pending:{
            type: Boolean,
            default: false
        },
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: "String",
            required: true
        }

    },
    {timestamps:  true}
)

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;