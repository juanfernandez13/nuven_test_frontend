import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany();
    const tasksWithDateFormat = tasks.map((task) => {
      return {
        ...task,
        expirationDate: moment(task.expirationDate).format("DD/MM/YYYY"),
      };
    });
    return tasksWithDateFormat;
  } catch (err) {
    return "Erro ao buscar tarefas";
  }
};

export const getTaskById = async (id) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    return {
      ...task,
      expirationDate: moment(task.expirationDate).format("DD/MM/YYYY"),
    };
  } catch (err) {
    console.log(err);
    return "Erro ao buscar tarefa";
  }
};

export const getTaskByDescriptionOrTitle = async (text) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            description: {
              contains: text,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: text,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const tasksWithDateFormat = tasks.map((task) => {
      return {
        ...task,
        expirationDate: moment(task.expirationDate).format("DD/MM/YYYY"),
      };
    });
    return tasksWithDateFormat;
  } catch (err) {
    console.log(err);
    return "Erro ao buscar tarefas";
  }
};

export const createTask = async (taskObj) => {
  const { title, description, expirationDate } = taskObj;

  const momentDate = moment(expirationDate, "DD/MM/YYYY");
  const isoDate = momentDate.toISOString();

  try {
    await prisma.task.create({
      data: {
        title: title,
        description: description,
        expirationDate: isoDate,
      },
    });

    return "Tarefa criada com sucesso";
  } catch (err) {
    console.log(err);
    return "Erro ao criar tarefa";
  }
};

export const updateTask = async (taskObj, id) => {
  const { title, description, expirationDate } = taskObj;

  const momentDate = moment(expirationDate, "DD/MM/YYYY");
  const isoDate = momentDate.toISOString();
  const dateNow = moment().toISOString();

  try {
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        description: description,
        expirationDate: isoDate,
        updateAt: dateNow,
      },
    });

    return "Tarefa atualizada com sucesso";
  } catch (err) {
    console.log(err);
    return "Erro ao atualizar tarefa";
  }
};

export const deleteTask = async (id) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    return "Tarefa removida com sucesso";
  } catch (err) {
    return "Erro ao remover tarefa";
  }
};
