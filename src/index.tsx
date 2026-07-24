/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { getCurrentWindow } from "@tauri-apps/api/window";

import TaskContext from "./components/context/GlobalTaskList"
import { commands } from "./models/bindings";

const appWindow = getCurrentWindow();
await appWindow.listen('tauri://close-requested', async (_) => {
    let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);
    if (incompleteTasks.length == 0) {
        appWindow.destroy();
        return;
    }
    await commands.saveTasks(incompleteTasks);
    // doesn't close program but effectively closes program
    appWindow.destroy();
});

render(() => <App />, document.getElementById("root") as HTMLElement);
