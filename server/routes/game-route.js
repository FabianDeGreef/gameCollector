const express = require("express");
const multer = require("multer");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const gameController = require("../controllers/gameController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// View game list
router.get("/", gameController.view);
// Get game list game by id
router.get("/gamelist/", gameController.list);
// Search game by name
router.post("/", gameController.search);
// View add game
router.get("/creategame", gameController.createForm);
// Add game
router.post("/creategame", upload.single("file"), gameController.create);
// View update game
router.get("/updategame/:id", gameController.updateFrom);
// Update game
router.post("/updategame/:id", upload.single("file"), gameController.update);
// View game
router.get("/viewgame/:id", gameController.viewgame);
// Delete game by id
router.get("/delete/:id", gameController.delete);

module.exports = router;
