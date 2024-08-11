import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const DialogConfirmComponent = (props) => {
  const { isOpen, onClose, confirmTitle, confirmDescription, onSubmit } = props;

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
        className="flex items- flex-col"
      >
        <h2 className="text-2xl mb-4">{confirmTitle}</h2>
        <p>{confirmDescription}</p>

        <div className="flex gap-8 mt-8">
          <button
            className="px-8 py-3 rounded-lg transition-colors duration-300 bg-red-500 hover:bg-[#D85C5E]"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Confirmar
          </button>
          <button
            className="px-8 py-3 rounded-lg border-2 border-white hover:bg-[#ffffff40] transition-colors duration-500"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmComponent;
