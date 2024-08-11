import React, { useState } from "react";

import moment from "moment";

import DialogTaskComponent from "./DialogComponent";

import { baseURL } from "@/constants";
import { DialogConfirmComponent } from ".";

const CardTaskComponent = ({ task, editTask, deleteTask }) => {
  const { id, title, description, expirationDate } = task;

  const [readMore, setReadMore] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  let seeDescription = "";
  const splitDescription = description.split(" ");
  const isBigDescription = splitDescription.length >= 30;

  const readMoreFunction = () => {
    const description30Words =
      splitDescription.slice(0, 30).join(" ") + (isBigDescription ? "..." : "");
    seeDescription = readMore ? description : description30Words;
  };

  readMoreFunction();

  const classBgColor = () => {
    const today = moment();
    const expirationDateFormatted = moment(expirationDate, "DD/MM/YYYY");

    const diference = today.diff(expirationDateFormatted, "days");

    if (diference > 0) {
      return "bg-red-400";
    }
    if (diference === 0) {
      return "bg-orange-400";
    }
    if (diference >= -1) {
      return "bg-yellow-400";
    }
    return "bg-green-400";
  };

  const handleCloseConfirm = () => {
    setShowDialogConfirm(false);
  };

  return (
    <div className="w-4/5 bg-card rounded-lg border-[2px] border-white flex overflow-hidden justify-between p-4 sm:px-8 ">
      <DialogTaskComponent
        isOpen={showDialogEdit}
        onClose={() => setShowDialogEdit(false)}
        task={task}
        onSubmit={(task) => editTask({ ...task, id: id })}
      />
      <DialogConfirmComponent
        isOpen={showDialogConfirm}
        onClose={() => handleCloseConfirm()}
        confirmTitle={"Deseja confirmar?"}
        confirmDescription={"Você realmente deseja excluir essa tarefa?"}
        onSubmit={() => deleteTask(id)}
      />
      <div className="w-full sm:w-4/5 flex gap-4 flex-col">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p>
          {seeDescription}
          {"\t"}
          {isBigDescription && (
            <button
              className="underline"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "  Ler menos" : "  Ler mais"}
            </button>
          )}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p>Expira em {expirationDate}</p>
          <div
            className={[
              `w-1/4 h-full flex sm:hidden rounded-2xl ${classBgColor()}`,
            ]}
          />
        </div>
        <div className="w-full justify-center sm:justify-start flex gap-6">
          <button
            className="px-4 py-2 rounded-lg border-2 border-white hover:bg-[#ffffff40] transition-colors duration-500"
            onClick={() => setShowDialogEdit(true)}
          >
            Editar
          </button>
          <button
            className="px-4 py-2 rounded-lg border-2 border-red-500 bg-red-500 hover:bg-[#D85C5E] hover:border-[#D85C5E] transition-colors duration-500"
            onClick={() => {
              setShowDialogConfirm(true);
            }}
          >
            Excluir
          </button>
        </div>
      </div>

      <div
        className={[
          `w-[120px] h-min-full hidden sm:flex translate-x-8 scale-y-125 ${classBgColor()}`,
        ]}
      />
    </div>
  );
};

export default CardTaskComponent;
