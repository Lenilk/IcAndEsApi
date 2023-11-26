import express from "express";
import * as data from "./Routes/data";
import * as note from "./Routes/note";
import * as users from "./Routes/users";
const router = express.Router();

// Route of users
router.get("/users", users.getUsers);
router.post("/createUser", users.createUser);
router.put("/changePassword", users.changePassword);
router.put("/changeUsername", users.changeUsername);

// Route of data
router.get("/data", data.getData);
router.post("/postData", data.postData);
router.delete("/deleteData", data.deleteData);

// Route of note
router.post("/postNote", note.postNote);
router.delete("/deleteNote", note.deleteNote);
router.put("/updateNote",note.updateNote);


export = router;
