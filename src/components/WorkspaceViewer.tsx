import { Workspace } from "../models/bindings"
import CurrentTask from "./CurrentTask"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4';
import TagWranglerLexer from '../models/.antlr/TagWranglerLexer';
import TagWranglerParser from '../models/.antlr/TagWranglerParser';
import { TagVisitor } from "../models/TagVisitor";

import TaskContext from "../components/context/GlobalTaskList"

type WorkspaceViewerProps = {
    workspace: Workspace
}

export default function WorkspaceViewer(props: WorkspaceViewerProps) {
    const chars = CharStreams.fromString(props.workspace.filter_query);
    const lexer = new TagWranglerLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    let parser = new TagWranglerParser(tokens);
    parser.removeErrorListeners();
    parser._errHandler = new BailErrorStrategy();

    const tree = parser.expr();
    const visitor = new TagVisitor();

    // TODO! finish after extending language
   
    const result: boolean = visitor.visit(tree);

    return <>
        <div class="container">
            <CurrentTask tasks={TaskContext.tasks} />
            <div class="medium padded" />
            <TaskForm />
            <div class="medium padded" />
            <TaskList tasks={TaskContext.tasks} />
        </div>
    </>
}