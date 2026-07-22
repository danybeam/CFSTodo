import { batch, createSignal } from "solid-js";
import { Task } from "../models/Task";

import TaskContext from "./context/GlobalTaskList"

class TaskListItemProps {
    task!: Task;
}

export function TaskListItem(props: TaskListItemProps) {
    const { toggleTask } = TaskContext;
    //  const [checked, setChecked] = createSignal(props.task.completed);
    //  const [itemText, setItemText] = createSignal(props.task.text + " " + props.task.completed);

    return (
        <div class="row padded">
            <div class="framed">
                <input
                    type="checkbox"
                    checked={props.task.completed}
                    onInput={[toggleTask, props.task.id]}
                />
                <span>{props.task.text + " " + props.task.completed}</span>
            </div>
        </div>
    );
}