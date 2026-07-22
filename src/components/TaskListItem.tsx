import { createSignal } from "solid-js";
import { Task } from "../models/Task";

import TaskContext from "./context/GlobalTaskList"

class TaskListItemProps {
    task!: Task;
}

export function TaskListItem(props: TaskListItemProps) {
    const [extraMenu, setExtraMenu] = createSignal(false);

    return (
        <div class="padded row">
            <div class="framed row">
                <span style="margin-right: 20px;">{props.task.text}</span>

                <div class="button-container">
                    <div class="button-slider" classList={{ secondary: extraMenu() }}>
                        <div class="button-group">
                            <button>ℹ️</button>
                            <button>✅</button>
                            <button>🔄️</button>
                            <button onClick={() => setExtraMenu(!extraMenu())}>↪️</button>
                        </div>
                        <div class="button-group">
                            <button>⏸️</button>
                            <button>▶️</button>
                            <button onClick={() => TaskContext.removeTask(props.task.id)}>❌</button>
                            <button onClick={() => setExtraMenu(!extraMenu())}>🔙</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}