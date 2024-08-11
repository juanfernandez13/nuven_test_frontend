import { useEffect, useState } from "react";

import {
  CardTaskComponent,
  DialogTaskComponent,
  SearchBarComponent,
} from "@/components";

import useDebounce from "@/helpers/debounce";

import { baseURL } from "@/constants";

export default function Home() {
  const [textSearch, setTextSearch] = useState("");
  const [listTasks, setListTasks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const debouncedValue = useDebounce(textSearch, 300);

  useEffect(() => {
    getTasks();
  }, [debouncedValue]);

  const getTasks = async () => {
    if (debouncedValue == "") {
      const response = await fetch(baseURL + "/list");
      const { data } = await response.json();
      setListTasks(data);
    } else {
      const response = await fetch(baseURL + "/list", {
        method: "POST",
        body: JSON.stringify({ textSearch: debouncedValue }),
        headers: { "Content-Type": "application/json" },
      });

      const { data } = await response.json();

      if (data) {
        setListTasks(data);
      }
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const createTask = async (task) => {
    const { title, description, expirationDate } = task;
    try {
      await fetch(baseURL + "/list/", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          expirationDate: expirationDate,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full bg-background min-h-screen flex items-center flex-col py-6 px-8">
      <SearchBarComponent value={textSearch} setValue={setTextSearch} />
      <button
        className="px-8 py-2 bg-red-500 rounded-lg border-2 border-white my-4"
        onClick={() => setShowDialog(true)}
      >
        Nova tarefa
      </button>
      <DialogTaskComponent
        isOpen={showDialog}
        onClose={handleClose}
        onSubmit={(task) => createTask(task)}
      />

      <div className="mt-4 gap-8 w-full flex items-center flex-col">
        {listTasks.map((task, index) => (
          <CardTaskComponent key={index + "tasks"} task={task} />
        ))}
      </div>
    </div>
  );
}
