// SolidJS imports
import { batch, createEffect, createSignal, Show } from "solid-js";

// General App imports
import { Task } from "../models/bindings";

// App context imports
import TaskContext from "./context/GlobalTaskList";

// App components imports
import TimeEntry from "./TimeEntry";

// Prop type definiton
type TaskListItemProps = {
    task: Task,
    isCurrentTask: boolean
}

export default function TaskListItem(props: TaskListItemProps) {
    const [extraMenu, setExtraMenu] = createSignal(false);
    const [showTimeModal, setShowTimeModal] = createSignal(false);
    const [showExtraInfoModal, setShowExtraInfoModal] = createSignal(false);
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

            setShowTimeModal(false);
        })
    });


    let rotateBtn = <button
        onClick={() => {
            setShowTimeModal(!showTimeModal());
        }}
    >
        🔄️
    </button >;
    let suspreemptBtn = <button
        onClick={() => {
            setShowTimeModal(false);
            setShouldSuspend(true);
        }}
    >
        {props.task.isSuspended ? "▶️" : "⏸️"}
    </button>;
    let completeBtn = <button
        onClick={() => {
            setShowTimeModal(false);
            TaskContext.toggleTask(props.task.id);
        }}
    >
        {props.task.completed ? "✅" : "✔️"}
    </button>;
    let deleteBtn = <button
        onClick={() => {
            setShowTimeModal(false)
            TaskContext.removeTask(props.task.id);
        }}
    >
        ❌
    </button>;

    let infoBtn = <button
        onClick={() => {
            setShowExtraInfoModal(!showExtraInfoModal());
        }}
    >
        ℹ️
    </button>;

    // TODO_ Simplify component to make more easy to read
    return (
        <>
            <Show when={showTimeModal()}>
                <TimeEntry timeEntryCallback={setWorkedHours} requestSuspendCallback={setShouldSuspend} />
            </Show>
            <div style="display:flex; flex-direction:column;">
                <div class="padded row">
                    <div class="framed row">
                        <span style={`margin-right: 20px; ${props.task.completed ? "text-decoration: line-through;" : ""}`}>
                            {
                                props.task.text + " " +
                                props.task.completed + " " +
                                props.task.isSuspended + " " +
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
                                    {infoBtn}
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
                                        {infoBtn}
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
                <div
                    class="foldable"
                    classList={{ extended: showExtraInfoModal() }}
                    style="display:flex;flex-direction:column"
                >
                    <p>Description goes here</p>
                    <p>Tags go here</p>
                </div>
            </div>
        </>
    );
}