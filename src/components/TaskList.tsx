import { For } from "solid-js";
import { TaskListItem } from "./TaskListItem";
import TaskContext from "./context/GlobalTaskList"

export function TaskList() {
    const { tasks } = TaskContext;

    return (
        <For each={tasks}>{
            (task) => <TaskListItem task={task} />
        }
        </For>
    );
}