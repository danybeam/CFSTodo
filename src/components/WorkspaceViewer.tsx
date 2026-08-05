import { Task, Workspace } from "../models/bindings"
import CurrentTask from "./CurrentTask"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4';
import TagWranglerLexer from '../models/.antlr/TagWranglerLexer';
import TagWranglerParser from '../models/.antlr/TagWranglerParser';
import { TagVisitor } from "../models/TagVisitor";

import TaskContext from "../components/context/GlobalTaskList"
import { createStore } from "solid-js/store";
import { onMount } from "solid-js";

type WorkspaceViewerProps = {
    workspace: Workspace | undefined
}

export default function WorkspaceViewer(props: WorkspaceViewerProps) {
    if (props.workspace == undefined) {
        return <p>ERROR DISPLAYING WORKSPACE</p>;
    }

    const [tasks, setTasks] = createStore<Task[]>([]);

    onMount(() => {
        const chars = CharStreams.fromString(props.workspace?.filter_query ?? "any(is impossible)");
        const lexer = new TagWranglerLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        let parser = new TagWranglerParser(tokens);
        parser.removeErrorListeners();
        parser._errHandler = new BailErrorStrategy();

        const tree = parser.expr();
        const visitor = new TagVisitor();

        let newTasks = TaskContext.tasks.filter((t) => {
            visitor.visitorContext = t.tags ?? [];
            return visitor.visit(tree);
        });

        setTasks(newTasks);
    });

    return <>
        <div class="container">
            <CurrentTask tasks={tasks} />
            <div class="medium padded" />
            <TaskForm />
            <div class="medium padded" />
            <TaskList tasks={tasks} />
        </div>
    </>
}