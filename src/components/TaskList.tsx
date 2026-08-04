import { createEffect, createSignal, For } from "solid-js";
import TaskListItem from "./TaskListItem";
import { Task } from "../models/bindings";

type TaskListProps = {
    tasks: Task[]
}

export default function TaskList(props: TaskListProps) {
    const { tasks } = props;

    const [allComplete, setAllComplete] = createSignal(false);
    createEffect(() => {
        let isComplete = tasks.at(0)?.completed ?? false;
        let is_suspended = tasks.at(0)?.is_suspended ?? false;
        setAllComplete(isComplete || is_suspended);
    })

    return (
        <For each={tasks.slice(allComplete() ? 0 : 1)}>{
            (task) => <TaskListItem task={task} isCurrentTask={false} />
        }
        </For>
    );
}