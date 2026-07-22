import { createSignal, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { Task } from "../../models/Task";

const TaskContext = createContext();

export function TaskProvider(props: any) {
    const [tasks, setTasks] = createStore([]),
        taskContext = [
            tasks,
            {
                addTask(text: string) {
                    setTasks([...tasks, new Task(tasks.length, text, false)]);
                    console.log(tasks);
                },
                toggleTask(id) {
                    setTasks(
                        (task) => task.id === id,
                        "completed",
                        (completed) => !completed,
                    )
                    console.log(tasks);
                }
            }
        ];

    return (
        <TaskContext.Provider value={taskContext}>
            {props.children}
        </TaskContext.Provider>
    );
}

export function useTask() { return useContext(TaskContext); }