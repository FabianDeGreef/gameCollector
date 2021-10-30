const mysql = require("mysql2");

// SQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// View games
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      'SELECT * FROM game WHERE active = "active"',
      (err, rows) => {
        // release connection after operation
        connection.release();

        if (!err) {
          let removedGame = req.query.removed;
          res.render("index", { rows, removedGame });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// View gamelist
exports.list = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      'SELECT * FROM game WHERE active = "active"',
      (err, rows) => {
        // release connection after operation
        connection.release();

        if (!err) {
          let removedGame = req.query.removed;
          res.render("game-list", { rows, removedGame });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Search game
exports.search = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    let searchTerm = req.body.search;

    if (searchTerm) {
      connection.query(
        "SELECT * FROM game WHERE name LIKE ? OR category LIKE ?",
        ["%" + searchTerm + "%", "%" + searchTerm + "%"],
        (err, rows) => {
          // release connection after operation
          connection.release();

          if (!err) {
            res.render("index", { rows });
            // console.log("The data from game table: \n", rows);
          } else {
            console.log(err);
          }
        }
      );
    }
  });
};

// View create game
exports.createForm = (req, res) => {
  res.render("create-game");
};

// Create new game
exports.create = (req, res) => {
  const { name, category, description } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    if (!req.file || Object.keys(req.file).lenght === 0) {
      return res.status(400).send("No files where uploaded.");
    }

    // Insert data
    connection.query(
      "INSERT INTO game SET name = ?, category = ?, description = ?, image = ?",
      [name, category, description, req.file.filename],
      (err) => {
        // release connection after operation
        connection.release();

        if (!err) {
          res.render("create-game", { alert: "Game added succesfully" });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// View update game
exports.updateFrom = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "SELECT * FROM game WHERE id = ?",
      [req.params.id],
      (err, row) => {
        // release connection after operation
        connection.release();
        if (!err) {
          res.render("update-game", { row });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Update game
exports.update = (req, res) => {
  const { name, category, description } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "UPDATE game SET name = ?, category = ?, description = ? WHERE id = ?",
      [name, category, description, req.params.id],
      (err) => {
        // release connection after operation
        connection.release();

        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err; // not connected
            console.log("Connected as ID " + connection.threadId);

            connection.query(
              "SELECT * FROM game WHERE id = ?",
              [req.params.id],
              (err, row) => {
                // release connection after operation
                connection.release();

                if (!err) {
                  res.render("update-game", {
                    row,
                    alert: `${name} updated succesfully`,
                  });
                } else {
                  console.log(err);
                }
              }
            );
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Delete game by id
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "UPDATE game SET active = ? WHERE id = ?",

      ["inactive", req.params.id],
      (err) => {
        // release connection after operation
        connection.release();
        if (!err) {
          let removedGame = encodeURIComponent("Game successfully removed");
          res.redirect("/?removed=" + removedGame);
        } else {
          console.log(err);
        }
      }
    );
  });
};

// View game
exports.viewgame = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected as ID " + connection.threadId);
    connection.query(
      "SELECT * FROM game WHERE id = ?",
      [req.params.id],
      (err, row) => {
        // release connection after operation
        connection.release();

        if (!err) {
          res.render("view-game", { row });
        } else {
          console.log(err);
        }
      }
    );
  });
};
