import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const DialogTaskComponent = (props) => {
  const { isOpen, onClose, task, onSubmit } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationDateError, setExpirationDateError] = useState(true);

  const titleDialog = task ? "Editar tarefa" : "Criar tarefa";
  const buttonCommand = task ? "Editar" : "Salvar";

  const existsTask = () => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setExpirationDate(task.expirationDate);
      setExpirationDateError(false);
    }
  };

  const disableButton =
    title.length < 2 ||
    description.length < 2 ||
    expirationDate.length != 10 ||
    expirationDateError;

  useEffect(() => {
    existsTask();
  }, []);

  const onChangeExpirationDate = (text) => {
    let value = text.replace(/\D/g, "");
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (value.length > 4) {
      value =
        value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
    }

    if (value.length === 10) {
      const [dia, mes, ano] = value.split("/").map(Number);

      if (mes < 1 || mes > 12) {
        setExpirationDateError(true);
        return;
      }

      const diasPorMes = [
        31,
        (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      if (dia < 1 || dia > diasPorMes[mes - 1]) {
        setExpirationDateError(true);
        return;
      }

      if (ano < 1900 || ano > 2100) {
        setExpirationDateError(true);
      } else {
        setExpirationDateError(false);
      }
    }

    setExpirationDate(value);
  };

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

        <div className="w-full mb-4 sm:mb-8 transition-all">
          <input
            className="w-full px-4 py-2 bg-transparent text-white text-lg rounded-lg border-white border-2 focus:ring-0 focus:outline-none"
            placeholder="Data final"
            value={expirationDate}
            onChange={(event) => onChangeExpirationDate(event.target.value)}
          />
          {expirationDateError && expirationDate.length === 10 && (
            <label className="font-normal text-red-500 text-sm">
              Insira uma data válida
            </label>
          )}
        </div>

        <button
          className={`px-8 py-3 sm:px-20 rounded-lg transition-colors duration-300 ${
            disableButton
              ? "bg-slate-500 hover:bg-slate-400"
              : "bg-red-500 hover:bg-[#D85C5E]"
          }`}
          disabled={disableButton}
          onClick={() => {
            onSubmit({ title, description, expirationDate });
            onClose();
            setTitle("");
            setDescription("");
            setExpirationDate("");
          }}
        >
          {buttonCommand}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTaskComponent;
