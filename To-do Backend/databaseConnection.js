const mongoose = require("mongoose");
const dns = require("dns");
//function to connect mongo db 
function DbConnection() {

    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL);

    const db = mongoose.connection;
    // shows error if database fails
    db.on("error", console.error.bind(console, "Connection Error"));
    // shows success message if database connects
    db.once("open", function () {
        console.log("Database Connected...");
    });

}

module.exports = DbConnection;