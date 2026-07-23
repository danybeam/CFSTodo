import { createEffect, createSignal, For } from "solid-js";
import TaskListItem from "./TaskListItem";
import TaskContext from "./context/GlobalTaskList"

export default function TaskList() {
    const { tasks } = TaskContext;

    const [allComplete, setAllComplete] = createSignal(false);
    createEffect(() => {
        let isComplete = tasks.at(0)?.completed ?? false;
        let isSuspended = tasks.at(0)?.isSuspended ?? false;
        setAllComplete(isComplete || isSuspended);
    })

    return (
        <For each={tasks.slice(allComplete() ? 0 : 1)}>{
            (task) => <TaskListItem task={task} isCurrentTask={false} />
        }
        </For>
    );
}