import mongoose from "mongoose";

function connectToDB() {
    
    mongoose.connect(process.env.CONNECTION_STRING as string).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    });

}

export default connectToDB;