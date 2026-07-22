import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

function createGlobalTaskList() {
    const [tasks, setTasks] = createStore([]);

    const addTask = (text: string) => {
        setTasks([...tasks, { id: tasks.length, text: text, completed: false }]);
    }

    const toggleTask = (id: number) => {
        setTasks(
            (task) => task.id === id,
            "completed",
            completed => !completed
        )
    }

    return { tasks, addTask, toggleTask };
}

export default createRoot(createGlobalTaskList);