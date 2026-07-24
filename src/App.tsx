import { createSignal, onMount, Show } from "solid-js";
import "./App.css";

import CurrentTask from "./components/CurrentTask";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SettingsContext from "./components/context/AppSettings"
import TaskContext from "./components/context/GlobalTaskList"

import { commands } from "./models/bindings";

function App() {

  const [hasLoaded, setHasLoaded] = createSignal(false);

  onMount(async () => {
    setHasLoaded(false);
    TaskContext.batchAddTasks(await commands.loadTasks());
    await setTimeout(() => { setHasLoaded(true); }, 100);
  })

  return (
    <Show
      when={hasLoaded()}
      fallback={<div>Loading tasks...</div>}
    >
      <div class="time-slice" classList={{ overburdened: SettingsContext.isOverburdened() }}>
        {(SettingsContext.isOverburdened() ? "Overburdened! (forcing 4hrs per slice)" : SettingsContext.calculatedTimeSlice().toFixed(0) + " hours per slice")}
      </div>
      <div class="container">
        <CurrentTask />
        <div class="medium padded" />
        <TaskForm />
        <div class="medium padded" />
        <TaskList />
      </div>
    </Show>

  );
}

export default App;
