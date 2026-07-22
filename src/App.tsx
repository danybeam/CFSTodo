import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import "./App.css";

import TaskForm from "./components/TaskForm";
import { Task } from "./models/Task";
import { TaskListItem } from "./components/TaskListItem";

function App() {

  const [tasks, setTasks] = createStore([]);

  const addTask = (text: string) => {
    setTasks([...tasks, new Task(tasks.length, text, false)]);
  }

  const toggleTask = (id) => {
    setTasks(
      (task) => task.id === id,
      "completed",
      (completed) => !completed,
    )
  }

  return (
    <main class="container">
      <TaskForm addTaskFunc={addTask} />
      <For each={tasks}>{
        (task) => <TaskListItem task={task} toggleTodo={toggleTask} />
      }
      </For>
      <button onclick={() => { toggleTask(0); console.log(tasks); }}>Toggle</button>
    </main>
  );
}

export default App;
