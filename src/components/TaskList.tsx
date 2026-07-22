import { For } from "solid-js";
import { useTask } from "./context/TaskContext";
import { TaskListItem } from "./TaskListItem";

export function TaskList(props: any) {
    const [tasks, { addTask, toggleTask }] = useTask();
    
    return (
        <For each={tasks}>{
            (task) => <TaskListItem task={task} />
        }
        </For>
    );
}