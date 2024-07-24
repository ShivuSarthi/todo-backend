const express = require("express");
const auth = require("../middleware/auth.js");
const {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo
} = require("../controllers/toDoController.js");
const router = express.Router();

router.get("/", auth, getToDo);
router.post("/", auth, addToDo);
router.put("/:id", auth, updateToDo);
router.delete("/:id", auth, deleteToDo);

module.exports = router;
