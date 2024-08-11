import { deleteTask, getTaskById, updateTask } from "@/controllers/task_controllers";

export default async function Handler(req, res) {
  const { method, body, query } = req;

  const allowedMethods = ["GET", "PUT", "DELETE"];

  if (!allowedMethods.includes(method)) {
    return res.status(405).json({ error: "method not allowed" });
  }

  if(method === "GET"){
    const task = await getTaskById(query.id)
    return res.status(200).json({
      data: task
    })
  }
  if(method === "PUT"){
    const message = await updateTask(body,query.id)
    return res.status(200).json({
      message: message
    })
  }
  if(method === "DELETE"){
    const message = await deleteTask(query.id)
    if(message) {
      return res.status(400).json({message: message})
    }
    return res.status(204).send()
  }
  
}
