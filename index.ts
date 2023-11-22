import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const PORT = 3000;
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
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
    orderBy: { User: { username: username } },
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

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
