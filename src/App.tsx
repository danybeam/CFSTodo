import "./App.css";

import TaskForm from "./components/TaskForm";
import { TaskProvider } from "./components/context/TaskContext";
import { TaskList } from "./components/TaskList";

function App() {

  return (
    <TaskProvider>
      <main class="container">
        <TaskForm />
        <TaskList />
      </main>
    </TaskProvider>
  );
}

export default App;
