import { CardTaskComponent, SearchBarComponent } from "@/components";
import { baseURL } from "@/constants";
import useDebounce from "@/helpers/debounce";
import { useEffect, useState } from "react";

export default function Home() {
  const [textSearch, setTextSearch] = useState("");
  const [listTasks, setListTasks] = useState([]);

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

  return (
    <div className="w-full h-full bg-background min-h-screen flex items-center flex-col">
      <SearchBarComponent value={textSearch} setValue={setTextSearch} />
      <div className="mt-4 gap-8 w-full flex items-center flex-col">
      {listTasks.map((task, index) => (
        <CardTaskComponent key={index + "tasks"} task={task} />
      ))}
      </div>
    </div>
  );
}
