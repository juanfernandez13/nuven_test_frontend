// Dialog.js
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const DialogTaskComponent = (props) => {
  const { isOpen, onClose, task, onSubmit } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const titleDialog = task ? "Editar tarefa" : "Criar tarefa";
  const buttonCommand = task ? "Editar" : "Salvar";

  const existsTask = () => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setExpirationDate(task.expirationDate);
    }
  }

  useEffect(() => {
    existsTask()
  }, [])

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        backgroundColor: "#3C313E99",
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#312732",
          borderWidth: "2px",
          borderRadius: "4px",
          borderColor: "#ffffff",
          color: "#ffffff",
        }}
        className="flex items-center flex-col h-[400px] w-[300px] sm:w-[600px] sm:h-[600px]"
      >
        <h2 className="text-2xl mb-8">{titleDialog}</h2>
        <input
          className="w-full mb-4 sm:mb-8 px-4 py-2 bg-transparent text-white text-lg rounded-lg border-white border-2 focus:ring-0 focus:outline-none"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          />
        <textarea
          rows={8}
          className="w-full  mb-4 sm:mb-8 px-4 py-2 bg-transparent text-white text-lg rounded-lg border-white border-2 focus:ring-0 focus:outline-none"
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          />
        <input
          className="w-full mb-4 sm:mb-8 px-4 py-2 bg-transparent text-white text-lg rounded-lg border-white border-2 focus:ring-0 focus:outline-none"
          placeholder="Data final"
          value={expirationDate}
          onChange={(event) => setExpirationDate(event.target.value)}
        />
        <button className="bg-red-500 px-8 py-3 sm:px-20 rounded-lg hover:bg-[#D85C5E] transition-colors duration-300">
          {" "}
          {buttonCommand}{" "}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTaskComponent;
