import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
//('/data')
export const getData = async (req: Request, res: Response) => {
  const username = req.body.username;
  const data = await prisma.data.findMany({
    where: { User: { username: username } },
    include: { Note: true },
  });
  res.json(data);
};
//("/postData")
export const postData = async (req: Request, res: Response) => {
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
      Data: { include: { Note: true } },
    },
  });
  res.json(post);
};
//("/deleteData")
export const deleteData = async (req: Request, res: Response) => {
  const user = req.body.user;
  const dateId = req.body.dateId;
  const whereData: Prisma.dataWhereUniqueInput = { id: dateId, user: user };
  const result = await prisma.data.delete({
    where: whereData,
  });
  res.json(result);
};
