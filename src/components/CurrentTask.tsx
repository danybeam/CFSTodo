import { createEffect, createSignal, Show } from "solid-js";
import TaskContext from "./context/GlobalTaskList"
import TaskListItem from "./TaskListItem";
import { Task } from "../models/Task";

export default function CurrentTask() {
    const [firstTask, setFirstTask] = createSignal<Task>(TaskContext.tasks[0]);
    createEffect(() => {
        setFirstTask(TaskContext.tasks.at(0) ?? { id: -1, text: "error", completed: false, isSuspended: false });
    })

    return (
        <Show
            when={firstTask()?.id >= 0}
            fallback={<span>Add a task to get started</span>}
        >
            <TaskListItem task={firstTask()} isCurrentTask={true} />
        </Show>
    );
}