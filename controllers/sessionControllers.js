const asyncHandler = require("express-async-handler")
const Session = require("../models/sessionModel")

const getDayOfWeek = require("../config/getDay");
const convertDateFormat = require("../config/changeDateFormat");

const createSession = asyncHandler(async(req, res) => {
    const {availablity, dean, pending, student, date} = await req.body;

    const day = getDayOfWeek(date);

    if(!dean || !day){
        res.status(400);
        throw new Error("please provide dean and day");
    }

    try{
        const createdSession = await Session.create({
            availablity,
            dean,
            pending,
            date,
            day,
            student
        })

        const fullCreatedSession = await Session.findOne({
            _id: createdSession._id
        }).populate("dean", "-password -isDean");

        res.status(200).send(fullCreatedSession);
    }catch(error){
        res.status(400);
        throw new Error(error.message)
    }
})

const fetchSessions = asyncHandler(async(req, res) => {
    const date = new Date().toJSON().slice(0, 10);
    const todayDate = convertDateFormat(date);
    try{
        await Session.find({
            availablity: "Available",
            date: {$gt: todayDate}
        })
        .populate("dean", "-password")
        .then((results) => {
            res.status(200).send(results);
        })
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {createSession, fetchSessions}