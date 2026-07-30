import { createSignal, onMount, Show } from "solid-js";
import "./App.css";

import CurrentTask from "./components/CurrentTask";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SettingsContext from "./components/context/AppSettings"
import TaskContext from "./components/context/GlobalTaskList"

import { commands } from "./models/bindings";

// Commenting for later
/*
import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4';
import TagWranglerLexer from './models/.antlr/TagWranglerLexer';
import TagWranglerParser from './models/.antlr/TagWranglerParser';
import { TagVisitor } from "./models/TagVisitor";

function testAntlr() {
  const input = "not is bar and is buzz and has foo";
  const chars = CharStreams.fromString(input);
  
  const lexer = new TagWranglerLexer(chars);
  
  const tokens = new CommonTokenStream(lexer);
  
  let parser = new TagWranglerParser(tokens);
  parser.removeErrorListeners();
  parser._errHandler = new BailErrorStrategy();
  
  const tree = parser.expr();
  const visitor = new TagVisitor();
  visitor.visitorContext = "foo";
  const result: boolean = visitor.visit(tree);
  console.log("outside")
  console.log(result);
}
*/

function App() {

  const [hasLoaded, setHasLoaded] = createSignal(false);

  onMount(async () => {
    setHasLoaded(false);
    TaskContext.batchAddTasks(await commands.loadTasks());
    await setTimeout(() => { setHasLoaded(true); }, 100);
  })

  return (
    <Show
      when={hasLoaded()}
      fallback={<div>Loading tasks...</div>}
    >
      <div class="time-slice" classList={{ overburdened: SettingsContext.isOverburdened() }}>
        {(SettingsContext.isOverburdened() ? "Overburdened! (forcing 4hrs per slice)" : SettingsContext.calculatedTimeSlice().toFixed(0) + " hours per slice")}
      </div>
      <div class="container">
        <CurrentTask />
        <div class="medium padded" />
        <TaskForm />
        <div class="medium padded" />
        <TaskList />
      </div>
    </Show>

  );
}

export default App;
