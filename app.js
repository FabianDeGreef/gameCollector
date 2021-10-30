const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;

// // middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));
app.use("/storage", express.static("storage"));

// helpers
var hbsHelpers = exphbs.create({
  helpers: require("./helpers/handlebars.js").helpers,
  extname: ".hbs",
});

// Templating engine
app.engine(".hbs", hbsHelpers.engine);
app.set("view engine", ".hbs");

// SQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// SQL connection test
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log("Connected as ID " + connection.threadId);
});

// Routes
const routes = require("./server/routes/game-route");
app.use("/", routes);

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
