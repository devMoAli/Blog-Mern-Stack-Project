const mongoose  = require("mongoose");


module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URI);
        console.log("Connected to MongoDB Successfully ✅🦋✅");
    } catch (error) {
        console.log("Connection to MongoDB Failed 🥴", error);
    }
};


