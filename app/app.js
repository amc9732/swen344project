var express = require("express"),
    app = express(),
    path = require("path"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    routes = require("./routes/index"),
    users = require("./routes/users"),
    mysql = require("mysql");

app.engine("html", require("ejs").renderFile), app.set("views", path.join(__dirname, "views")), app.set("view engine", "html"), app.use(logger("dev")), app.use(bodyParser.json()), app.use(bodyParser.urlencoded({
    extended: !1
})), app.use(cookieParser()), app.use(express.static(path.join(__dirname, "public"))), app.use("/", routes), app.use("/users", users);


var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b421d9d0efc603",
    password: "f96ce1ba",
    database: "heroku_a783285fe27a1fb"
});
connection.connect(function(e) {
    return e ? 
        void console.log("Error connecting to database...") : 
        void console.log("Connection to Heroku MySQL database successfully established.")
}), connection.end(function(e) {}), module.exports = app;