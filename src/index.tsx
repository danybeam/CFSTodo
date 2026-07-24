/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { getCurrentWindow } from "@tauri-apps/api/window";

import TaskContext from "./components/context/GlobalTaskList"
import { commands } from "./models/bindings";

const appWindow = getCurrentWindow();
await appWindow.listen('tauri://close-requested', async (event) => {
    let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);

    console.log(typeof (incompleteTasks[0].priority));
    await commands.saveTasks(incompleteTasks);
    // doesn't close program but effectively closes program
    //appWindow.destroy();
});

render(() => <App />, document.getElementById("root") as HTMLElement);
