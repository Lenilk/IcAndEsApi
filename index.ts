import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const PORT = 3000;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  const data = await prisma.users.findMany({ include: { Data: true } });
  res.json(data);
});

app.post("/createUser", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const data = await prisma.users.create({
    data: { username: username, password: password },
    include: { Data: true },
  });
  res.json(data);
});

app.get("/data", async (req: Request, res: Response) => {
  const username = req.body.username;
  const data = await prisma.data.findMany({
    where: { User: { username: username } },
    include: { Note: true },
  });
  res.json(data);
});

app.post("/postData", async (req: Request, res: Response) => {
  const user = req.body.user;
  const data = req.body.data;
  const post = await prisma.users.update({
    where: { username: user },
    data: {
      Data: {
        create: {
          Date: data.Date,
          Note: {
            create: {
              note: data.Note.note,
              info: data.Note.info,
              amount: data.Note.amount,
              type: data.Note.type,
            },
          },
        },
      },
    },
    include: {
      Data: true,
    },
  });
  res.json(post);
});

app.post("/postNote", async (req: Request, res: Response) => {
  const user = req.body.user;
  const id = req.body.dateId;
  const Note = req.body.Note;
  const result = await prisma.data.update({
    where: { user: user, id: id },
    data: {
      Note: {
        create: {
          note: Note.note,
          info: Note.info,
          amount: Note.amount,
          type: Note.type,
        },
      },
    },
  });
});

app.delete("/deleteNote", async (req: Request, res: Response) => {
  const noteId = req.body.noteId;
  const dateId = req.body.dateId;
  const result = await prisma.note.delete({
    where: { noteId: noteId, dateId: dateId },
  });
  res.json(result);
});

app.delete("/deleteData", async (req: Request, res: Response) => {
  const user = req.body.user;
  const dateId = req.body.dateId;
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
