import "./App.css";

import TaskForm from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

function App() {

  return (
    <main class="container">
      <TaskForm />
      <TaskList />
    </main>
  );
}

export default App;
