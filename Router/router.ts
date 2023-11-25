import express from "express";
import * as data from "./Routes/data";
import * as note from "./Routes/note";
import * as users from "./Routes/users";
const router = express.Router();

router.get("/users", users.getUsers);
router.get("/createUser", users.createUser);
router.get("/data", data.getData);
router.get("/postData", data.postData);
router.get("/deleteData", data.deleteData);
router.get("/deleteNote", note.deleteNote);
router.get("/postNote", note.postNote);
export = router;
