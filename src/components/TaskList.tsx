import { For } from "solid-js";
import TaskListItem from "./TaskListItem";
import TaskContext from "./context/GlobalTaskList"

export default function TaskList() {
    const { tasks } = TaskContext;

    return (
        <For each={tasks.slice(1)}>{
            (task) => <TaskListItem task={task} isCurrentTask={false} />
        }
        </For>
    );
}