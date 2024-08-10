import React, { useState } from "react";

const CardTaskComponent = ({ task }) => {
  const { title, description, expirationDate } = task;
  const [readMore, setReadMore] = useState(false);

  let seeDescription = "";

  const readMoreFunction = () => {
    const splitDescription = description.split(" ");
    const description30Words = splitDescription.slice(0, 30).join(" ") + "...";
    seeDescription = readMore ? description : description30Words;
  };
  readMoreFunction();

  return (
    <div className="w-4/5 lg:w3/5 bg-card rounded-lg border-[2px] border-white flex overflow-hidden justify-between p-4 sm:px-8 ">
      <div className="w-full sm:w-4/5 flex gap-4 flex-col">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p>
          {seeDescription}
          {"\t"}
          <button className="underline" onClick={() => setReadMore(!readMore)}>
            {readMore ? "  Ler menos" : "  Ler mais"}
          </button>
        </p>
        <div className="flex justify-between items-center gap-2">
          <p>Expira em {expirationDate}</p>
          <div className="w-1/4 h-full flex sm:hidden bg-red-400 rounded-2xl" />
        </div>
      </div>

      <div className="w-[120px] h-min-full hidden sm:flex bg-red-400 translate-x-8 scale-y-125 " />
    </div>
  );
};

export default CardTaskComponent;
