import { createSignal, Show } from "solid-js";
import { Task } from "../models/Task";

import TaskContext from "./context/GlobalTaskList"

type TaskListItemProps = {
    task: Task,
    isCurrentTask: boolean
}

export default function TaskListItem(props: TaskListItemProps) {
    const [extraMenu, setExtraMenu] = createSignal(false);

    let suspendBtn = <button>⏸️</button>
    let preemptBtn = <button>▶️</button>;
    let completeBtn = <button onClick={() => TaskContext.toggleTask(props.task.id)}>✅</button>;
    let deleteBtn = <button onClick={() => TaskContext.removeTask(props.task.id)}>❌</button>;

    return (
        <div class="padded row">
            <div class="framed row">
                <span style="margin-right: 20px;">
                    {props.task.text + " " + props.task.isSuspended}
                </span>

                <Show
                    when={props.isCurrentTask}
                    fallback={
                        <div class="static-button-group">
                            {preemptBtn}
                            {suspendBtn}
                            {completeBtn}
                            {deleteBtn}
                        </div>
                    }
                >
                    <div class="button-container">
                        <div class="button-slider" classList={{ secondary: extraMenu() }}>
                            <div class="button-group">
                                <button>ℹ️</button>
                                {completeBtn}
                                <button>🔄️</button>
                                <button onClick={() => setExtraMenu(!extraMenu())}>↪️</button>
                            </div>
                            <div class="button-group">
                                {suspendBtn}
                                {deleteBtn}
                                <button onClick={() => setExtraMenu(!extraMenu())}>🔙</button>
                            </div>
                        </div>
                    </div>
                </Show>


            </div>
        </div>
    );
}