// SolidJS imports
import { batch, createSignal, Match, onMount, Show, Switch } from "solid-js";

// General App imports
import "./App.css";
import { commands } from "./models/bindings";
import { PageView } from "./models/Enums";

// Global App imports
import TaskContext from "./components/context/GlobalTaskList";
import WorkspaceContext from "./components/context/WorkspaceList";

// App component imports
import Sidebar from "./components/Sidebar";
import WorkspaceBuilder from "./components/WorkspaceBuilder/WorkspaceBuilder";
import WorkspaceViewer from "./components/WorkspaceViewer";


function App() {

  const [hasLoaded, setHasLoaded] = createSignal(false);
  const [currentView, setCurrentView] = createSignal(PageView.DefaultTaskList);
  const [currentWorkspaceId, setCurrentWorkspaceId] = createSignal(-1);

  onMount(async () => {
    setHasLoaded(false);
    TaskContext.batchAddTasks(await commands.loadTasks());
    WorkspaceContext.batchAddWorkspaces(await commands.loadWorkspaces());
    await setTimeout(() => { setHasLoaded(true); }, 100);
  })



  return (
    <div style="display:flex; height:100%;">
      <Sidebar setTab={(p, i) => {
        batch(() => {
          setCurrentView(p);
          setCurrentWorkspaceId(i);
        });
      }} />
      <div style="overflow:hidden;">
        <Switch fallback={<div>Loading...</div>}>
          <Match when={currentView() == PageView.DefaultTaskList}>
            <Show
              when={hasLoaded()}
              fallback={<div>Loading tasks...</div>}
            >
              <WorkspaceViewer
                workspace={undefined}
                taskList={TaskContext.tasks}
              />
            </Show>
          </Match>
          <Match when={currentView() == PageView.WorkspaceBuilder}>
            <WorkspaceBuilder onSaveCallback={() => {
              batch(() => {
                setCurrentView(PageView.DefaultTaskList);
                setCurrentWorkspaceId(-1);
              })
            }} />
          </Match>
          <Match when={currentView() == PageView.Workspace}>
            <WorkspaceViewer
              workspace={WorkspaceContext.workspaces.find((w) => w.id == currentWorkspaceId())}
              taskList={TaskContext.tasks}
            />
          </Match>
        </Switch>
      </div>
    </div>
  );
}

export default App;
