import { Task } from "../models/Task";
import { useTask } from "./context/TaskContext";

class TaskListItemProps {
    task!: Task;
}

export function TaskListItem(props: TaskListItemProps) {
    const [tasks, { addTask, toggleTask }] = useTask();

    return (
        <div>
            <input
                type="checkbox"
                checked={props.task.completed}
                onChange={[toggleTask, props.task.id]}
            />
            <span>{props.task.text}</span>
        </div>
    );
}