import { batch, createEffect, createSignal, Show } from "solid-js";
import { Task } from "../models/bindings";

import TaskContext from "./context/GlobalTaskList"
import TimeEntry from "./TimeEntry";

type TaskListItemProps = {
    task: Task,
    isCurrentTask: boolean
}

export default function TaskListItem(props: TaskListItemProps) {
    const [extraMenu, setExtraMenu] = createSignal(false);
    const [showModal, setShowModal] = createSignal(false);
    const [workedHours, setWorkedHours] = createSignal(0.0);
    const [shouldSuspend, setShouldSuspend] = createSignal(false);

    createEffect(() => {
        batch(() => {
            if (workedHours() != 0) {
                TaskContext.rotateTask(props.task.id, workedHours());
                setWorkedHours(0);
            }

            if (shouldSuspend()) {
                TaskContext.suspendResumeTask(props.task.id);
                setShouldSuspend(false);
            }

            setShowModal(false);
        })
    });


    let rotateBtn = <button
        onClick={() => {
            setShowModal(true);
        }}
    >
        🔄️
    </button >;
    let suspreemptBtn = <button
        onClick={() => {
            setShowModal(false);
            setShouldSuspend(true);
        }}
    >
        {props.task.is_suspended ? "▶️" : "⏸️"}
    </button>;
    let completeBtn = <button
        onClick={() => {
            setShowModal(false);
            TaskContext.toggleTask(props.task.id);
        }}
    >
        {props.task.completed ? "✅" : "✔️"}
    </button>;
    let deleteBtn = <button
        onClick={() => {
            setShowModal(false)
            TaskContext.removeTask(props.task.id);
        }}
    >
        ❌
    </button>;

    // TODO_ Implement later if/when I add additional details to tasks
    // let infoBtn =  <button>ℹ️</button>;

    return (
        <>
            <Show when={showModal()}>
                <TimeEntry timeEntryCallback={setWorkedHours} requestSuspendCallback={setShouldSuspend} />
            </Show>
            <div class="padded row">
                <div class="framed row">
                    <span style={`margin-right: 20px; ${props.task.completed ? "text-decoration: line-through;" : ""}`}>
                        {
                            props.task.text + " " +
                            props.task.completed + " " +
                            props.task.is_suspended + " " +
                            props.task.vruntime.toFixed(0) + " " +
                            props.task.priority
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