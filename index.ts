import express from "express";
import router from "./Router/router";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}\n http://localhost:${PORT}`)
);
