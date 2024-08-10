import { createTask, getAllTasks, getTaskByDescriptionOrTitle } from "@/controllers/task_controllers";

export default async function Handler(req, res) {
  const { method, body } = req;

  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(method)) {
    return res.status(405).json({ error: "method not allowed" });
  }

  if (method === "GET" && JSON.stringify(body) != '{}') {
    const { textSearch } = body;

    const data = await getTaskByDescriptionOrTitle(textSearch);

    if (typeof data === "object") {
      return res.status(200).json({ data: data });
    }

    return res.status(500).json({ error: data });
  }

  if (method === "GET") {
    const data = await getAllTasks();

    if (typeof data === "object") {
      return res.status(200).json({ data: data });
    }

    return res.status(500).json({ error: data });
  }

  if (method === "POST") {
    const message = await createTask(body);

    if (message === "Tarefa criada com sucesso") {
      res.status(201).json({ message: message });
    }
    res.status(500).json({ message: message });
  }
}
