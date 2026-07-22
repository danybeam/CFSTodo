import { Task } from "../models/Task";

class TaskListItemProps {
    task!: Task;
    toggleTodo!: (id: number) => void;
}

export function TaskListItem(props: TaskListItemProps) {
    console.log("creating task item");
    return (
        <div>
            <input
                type="checkbox"
                checked={props.task.completed}
                onChange={[props.toggleTodo, props.task.id]}
            />
            <span>{props.task.text}</span>
        </div>
    );
}