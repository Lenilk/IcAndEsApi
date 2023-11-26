import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

//('/postNote')
export const postNote = async (req: Request, res: Response) => {
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
    include: { Note: true },
  });
  res.json(result);
};
//('/deleteNote')
export const deleteNote = async (req: Request, res: Response) => {
  const noteId = req.body.noteId;
  const dateId = req.body.dateId;
  const result = await prisma.note.delete({
    where: { noteId: noteId, dateId: dateId },
  });
  res.json(result);
};

export const updateNote = async (req: Request, res: Response) => {
  const noteId = req.body.noteId;
  const note = req.body.Note;
  const whereNote = Prisma.validator<Prisma.noteWhereUniqueInput>()({
    noteId: noteId,
  });
  const updateNote = Prisma.validator<Prisma.noteUpdateInput>()({
    info: note.info,
    amount: note.amount,
    note: note.note,
    type: note.type,
  });
  const result = prisma.note.update({ where: whereNote, data: updateNote });
  res.json(result);
};

export const getAllNote = async (req: Request, res: Response) => {
  const result = await prisma.note.findMany({});
  res.json(result);
};
