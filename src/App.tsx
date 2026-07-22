import "./App.css";
import { CurrentTask } from "./components/CurrentTask";

import TaskForm from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {

  return (
    <main class="container">
      <CurrentTask />
      <div class="medium padded" />
      <TaskForm />
      <div class="medium padded" />
      <TaskList />
    </main>
  );
}

export default App;
