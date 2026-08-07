const mongoose = require("mongoose");
const dns = require("dns");

function DbConnection() {

    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Error"));

    db.once("open", function () {
        console.log("Database Connected...");
    });

}

module.exports = DbConnection;