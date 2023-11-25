import express from "express";
import * as data from "./Routes/data";
import * as note from "./Routes/note";
import * as users from "./Routes/users";
const router = express.Router();

router.get("/users", users.getUsers);
router.post("/createUser", users.createUser);
router.get("/data", data.getData);
router.post("/postData", data.postData);
router.delete("/deleteData", data.deleteData);
router.delete("/deleteNote", note.deleteNote);
router.post("/postNote", note.postNote);

export = router;
