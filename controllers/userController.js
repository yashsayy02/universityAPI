const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Session = require("../models/sessionModel")
const generateToken = require("../config/generateToken");
const convertDateFormat = require("../config/changeDateFormat");

const registerUser = asyncHandler(async(req, res) => {
    const {name, universityID, password, isDean} = req.body;

    if( !name || !universityID || !password){
        res.status(400);
        throw new Error("please enter all the fields");
    }

    const userExist = await User.findOne({universityID: universityID});

    if(userExist){
        res.status(400)
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        universityID,
        password,
        isDean
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            universityID: user.universityID,
            isDean: user.isDean,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("User not found");
    }
})

const authUser = asyncHandler(async(req, res) => {
    const {universityID, password} = req.body;

    if(!universityID || !password){
        res.status(400);
        throw new Error("please enter all the fields")
    }

    const user = await User.findOne({universityID});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            universityID: user.universityID,
            password: user.password,
            isDean: user.isDean,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("invalid ID or Password")
    }
})

const bookSession = asyncHandler(async(req, res) => {
    const {sessionId} = req.body;

    if(req.user.isDean){
        res.status(400)
        throw new Error("session can only be booked by a STUDENT");
    }

    if(!sessionId){
        res.status(400);
        throw new Error("please select a session to book")
    }

    const bookedSession = await Session.findByIdAndUpdate(
        sessionId,
        {
            $set: {
                availablity: 'Booked',
                student: req.user._id,
                pending: true
            },
        },
        {
            new: true,
        }
    )
        .populate("dean", "-password")
        .populate("student", "-password");

    if(!bookedSession){
        res.status(400);
        throw new Error("chat not found")
    }else{
        res.json(bookedSession);
    }
})

const fetchPendingSessions = asyncHandler(async(req, res) => {
    if(!req.user.isDean){
        res.status(400)
        throw new Error("unauthorised user, route can only be accessed by a DEAN")
    }

    const date = new Date().toJSON().slice(0, 10);
    const todayDate = convertDateFormat(date);

    try{
        await Session.find({
            pending: true,
            date: {$gt: todayDate},
            dean: req.user._id
        })
            .populate("dean", "-password")
            .populate("student", "-password")
            .then((results) => {
                res.status(200).send(results);
            });
    }catch(error){
        res.status(200)
        throw new Error(error)
    }
})

module.exports = {registerUser, authUser, bookSession, fetchPendingSessions};