// SolidJS imports
import { batch, createEffect, createSignal, Show } from "solid-js";

// General App imports
import { Task } from "../models/bindings";

// App component imports
import TaskListItem from "./TaskListItem";

type CurrentTaskProps = {
    // TODO_ Check if it's possible to remove undefined
    firstTask: Task | undefined
}

export default function CurrentTask(props: CurrentTaskProps) {
    const [isValidId, setIsValidId] = createSignal(false);
    const [isValidTask, setIsValidTask] = createSignal(false);


    createEffect(() => {
        if (props.firstTask == undefined) {
            batch(() => {

                setIsValidId(false);
                setIsValidTask(false);
            });
        }
        // TODO_ Are all these null checks necessary anymore?
        let isValidId = (props.firstTask?.id ?? -1) >= 0;
        let isTaskCompleted = (props.firstTask?.completed ?? true);
        let isTaskSuspended = (props.firstTask?.is_suspended ?? true);

        setIsValidId(isValidId)
        setIsValidTask(!isTaskCompleted && !isTaskSuspended)
    })

    if (props.firstTask == undefined) {
        return <span style="height: 68px">{"Add a task to get started"}</span>
    }

    return (
        <Show
            when={isValidId() && isValidTask()}
            fallback={<span style="height: 68px">{"All task are completed or suspended. Add another task to get started."}</span>}
        >
            <TaskListItem task={props.firstTask} isCurrentTask={true} />
        </Show>
    );
}