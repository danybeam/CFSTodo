import { createEffect, createSignal, Show } from "solid-js";
import TaskListItem from "./TaskListItem";
import { Task } from "../models/bindings";

type CurrentTaskProps = {
    tasks: Task[]
}

export default function CurrentTask(props: CurrentTaskProps) {
    const [firstTask, setFirstTask] = createSignal<Task>(props.tasks[0]);
    const [isValidId, setIsValidId] = createSignal(false);
    const [isValidTask, setIsValidTask] = createSignal(false);

    createEffect(() => {
        let task = props.tasks.at(0);

        if (task == null) {
            setIsValidId(false);
            setIsValidTask(false);
            return;
        }

        let isValidId = (firstTask()?.id ?? -1) >= 0;
        let isTaskCompleted = (firstTask()?.completed ?? true);
        let isTaskSuspended = (firstTask()?.is_suspended ?? true);

        setFirstTask(props.tasks.at(0) ?? { id: -1, text: "error", completed: false, is_suspended: false, vruntime: 0, priority: -1, tags: [] });
        setIsValidId(isValidId)
        setIsValidTask(!isTaskCompleted && !isTaskSuspended)
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