import { createSignal, Show } from "solid-js";
import { Task } from "../models/Task";

import TaskContext from "./context/GlobalTaskList"
import TimeEntry from "./TimeEntry";

type TaskListItemProps = {
    task: Task,
    isCurrentTask: boolean
}



export default function TaskListItem(props: TaskListItemProps) {
    const [extraMenu, setExtraMenu] = createSignal(false);
    const [showModal, setShowModal] = createSignal(false);

    // TODO update vruntime with input + calculation later
    let rotateBtn = <button
        onClick={() => {
            setShowModal(false);
            TaskContext.rotateTask(props.task.id, 0);
        }}
    >
        🔄️
    </button >;
    let suspreemptBtn = <button
        onClick={() => {
            setShowModal(true);
        }}
    >
        {props.task.isSuspended ? "▶️" : "⏸️"}
    </button>;
    let completeBtn = <button
        onClick={() => {
            setShowModal(false);
            TaskContext.toggleTask(props.task.id);
        }}
    >
        ✅
    </button>;
    let deleteBtn = <button
        onClick={() => {
            setShowModal(false)
            TaskContext.removeTask(props.task.id);
        }}
    >
        ❌
    </button>;

    return (
        <>
            <Show when={showModal()}>
                {
                    // TODO send callbacks for vruntime calculation
                }
                <TimeEntry />
            </Show>
            <div class="padded row">
                <div class="framed row">
                    <span style="margin-right: 20px;">
                        {
                            props.task.text + " " +
                            props.task.completed + " " +
                            props.task.isSuspended + " " +
                            props.task.vruntime.toFixed(2)
                        }
                    </span>

                    <Show
                        when={props.isCurrentTask}
                        fallback={
                            <div class="static-button-group">
                                <Show when={!props.task.completed}>
                                    {suspreemptBtn}
                                </Show>
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
                                    {rotateBtn}
                                    <button
                                        onClick={() => setExtraMenu(!extraMenu())}
                                    >
                                        {extraMenu() ? "🔙" : "↪️"}
                                    </button>
                                </div>
                                <div class="button-group">
                                    {suspreemptBtn}
                                    {deleteBtn}
                                    <button
                                        onClick={() => setExtraMenu(!extraMenu())}
                                    >
                                        {extraMenu() ? "🔙" : "↪️"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Show>
                </div>
            </div>
        </>
    );
}