import "./App.css";
import { ActiveTask } from "./components/ActiveTask";

import TaskForm from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {

  return (
    <main class="container">
      <ActiveTask />
      <TaskForm />
      <TaskList />
    </main>
  );
}

export default App;
