// SolidJS imports
import { createEffect, createSignal, For } from "solid-js";

// General App imports
import { Task } from "../models/bindings";

// App component imports
import TaskListItem from "./TaskListItem";

// Props type definiton
type TaskListProps = {
    tasks: Task[]
}

export default function TaskList(props: TaskListProps) {
    const { tasks } = props;

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