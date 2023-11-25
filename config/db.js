const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const connectToDB = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected!")
    }catch(error){
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB