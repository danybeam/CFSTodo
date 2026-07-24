import { createEffect, createSignal, Show } from "solid-js";
import TaskContext from "./context/GlobalTaskList"
import TaskListItem from "./TaskListItem";
import { Task } from "../models/Task";

export default function CurrentTask() {
    const [firstTask, setFirstTask] = createSignal<Task>(TaskContext.tasks[0]);
    const [isValidId, setIsValidId] = createSignal(false);
    const [isValidTask, setIsValidTask] = createSignal(false);

    createEffect(() => {
        let task = TaskContext.tasks.at(0);

        if (task == null) {
            setIsValidId(false);
            setIsValidTask(false);
            return;
        }

        setFirstTask(TaskContext.tasks.at(0) ?? { id: -1, text: "error", completed: false, isSuspended: false, vruntime: 0, priority: -1 });
        setIsValidId((firstTask()?.id ?? -1) >= 0)
        setIsValidTask(!(firstTask()?.completed ?? true) && !(firstTask()?.isSuspended ?? true))
    })

    return (
        <Show
            when={isValidId() && isValidTask()}
            fallback={<span style="height: 68px">{isValidId() ? "All task are completed or suspended. Add another task to get started." : "Add a task to get started"}</span>}
        >
            <TaskListItem task={firstTask()} isCurrentTask={true} />
        </Show>
    );
}