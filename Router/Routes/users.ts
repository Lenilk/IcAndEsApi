import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// ('/users')
export const getUsers = async (req: Request, res: Response) => {
  const data = await prisma.users.findMany({
    include: { Data: { include: { Note: true } } },
  });
  res.json(data);
};
// ('/crreteUser')
export const createUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const data = await prisma.users.create({
    data: { username: username, password: password },
    include: { Data: true },
  });
  res.json(data);
};

export const changePassword = async (req: Request, res: Response) => {
  const username = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const password = await prisma.users.findFirst({
    where: { username: username },
    select: { password: true },
  });
  const result =
    oldPassword == password?.password
      ? await prisma.users.update({
          where: { username: username },
          data: { password: newPassword },
        })
      : null;
  res.json(result);
};
