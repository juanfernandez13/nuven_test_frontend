import { CardTaskComponent, SearchBarComponent } from "@/components";
import { baseURL } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [textSearch, setTextSearch] = useState("")
  const [listTasks, setListTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, [textSearch]);

  const getTasks = async () => {
    const response = await fetch(baseURL + "/list");
    const { data } = await response.json();

    setListTasks(data);
  };

  return (
    <div className="w-full h-full bg-background min-h-screen flex items-center flex-col">
      <SearchBarComponent value={textSearch} setValue={setTextSearch}/>
      {listTasks.map((task,index) => (
        <CardTaskComponent key={index + "tasks"} task={task}/>
      ))}
    </div>
  );
}
