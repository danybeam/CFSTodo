// Antlr imports
import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4';
import TagWranglerLexer from '../models/.antlr/TagWranglerLexer';
import TagWranglerParser from '../models/.antlr/TagWranglerParser';

// Custom Antlr imports
import { TagVisitor } from "../models/TagVisitor";

// SolidJS imports
import { batch, createEffect, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";

// General app imports
import { Task, Workspace } from "../models/bindings";

// App Context imports
import SettingsContext from "../components/context/AppSettings";

// App Component imports
import CurrentTask from "./CurrentTask";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

// Props type definition
type WorkspaceViewerProps = {
    workspace: Workspace | undefined,
    taskList: Task[]
}

export default function WorkspaceViewer(props: WorkspaceViewerProps) {
    const [tasks, setTasks] = createStore<Task[]>([]);
    const [firstTask, setFirstTask] = createSignal<Task>({} as Task);
    const halfGap = 10;

    const [addTaskMode, setAddTaskMode] = createSignal(false);
    const [hideTaskForm, setHideTaskForm] = createSignal(true);

    let toggleTaskForm = () => {
        setHideTaskForm(!hideTaskForm());
        setTimeout(() => setAddTaskMode(!addTaskMode()), addTaskMode() ? 500 : 0);
    };

    createEffect(() => {
        if (props.workspace == undefined) {
            batch(() => {
                setTasks(props.taskList);
                setFirstTask(props.taskList.at(0) as Task);
                SettingsContext.calculateNewTimeSlice(props.taskList);
            })
            return;
        }

        const chars = CharStreams.fromString(props.workspace?.filterQuery ?? "any(is impossible)");
        const lexer = new TagWranglerLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        let parser = new TagWranglerParser(tokens);
        parser.removeErrorListeners();
        parser._errHandler = new BailErrorStrategy();

        const tree = parser.expr();
        const visitor = new TagVisitor();

        let newTasks = props.taskList.filter((t) => {
            visitor.visitorContext = t.tags ?? [];
            return visitor.visit(tree);
        });

        batch(() => {
            setTasks(newTasks);
            setFirstTask(newTasks.at(0) as Task);
            SettingsContext.calculateNewTimeSlice(newTasks);
        })
    });

    // TODO_ Break down into more manageable chunks
    return <>
        <div class="row">
            <div class="time-slice" classList={{ overburdened: SettingsContext.isOverburdened() }}>
                {(SettingsContext.isOverburdened() ? "Overburdened! (forcing 4hrs per slice)" : SettingsContext.calculatedTimeSlice().toFixed(0) + " hours per slice")}
            </div>
            <button
                onClick={toggleTaskForm}
            >
                {addTaskMode() ? "Cancel" : "Add Task"}
            </button>
        </div>
        <Show when={!addTaskMode()}>
            <div style="margin:10px;" />
        </Show>
        <div class="container" style="padding-top: 0px;">
            <div style="align-self:flex-start;">
                <h1 style={`margin-bottom:${halfGap}px; text-align:left;`}>{props.workspace?.name ?? "All tasks"}</h1>
                <p style={`margin-top:${halfGap}px; color:#6969697F; text-align:left;`}>{
                    props.workspace?.filterQuery == undefined ? "" : "Filter: " + props.workspace.filterQuery
                }
                </p>
            </div>
            <Show when={addTaskMode()}>
                <div class="task-form-container" classList={{ hidden: hideTaskForm() }}>
                    <TaskForm onSubmitCallback={toggleTaskForm} />
                    <div class="separator medium padded" />
                </div>
            </Show>
            <Show
                when={tasks.length > 0}
                fallback={
                    props.workspace == undefined ?
                        <p>Add a task to get started.</p> :
                        <p>No tasks match the workspace's filter</p>
                }
            >

                <CurrentTask firstTask={firstTask()} />
            </Show>
            <div class="separator medium padded" style="width:100vw" />
            <TaskList tasks={tasks} />
        </div>
    </>
}