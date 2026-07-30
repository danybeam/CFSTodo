/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { getCurrentWindow } from "@tauri-apps/api/window";

import TaskContext from "./components/context/GlobalTaskList"
import { commands } from "./models/bindings";

const appWindow = getCurrentWindow();
await appWindow.listen('tauri://close-requested', async (_) => {
    let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);

    await commands.saveTasks(incompleteTasks);

    // doesn't close program but effectively closes program
    appWindow.destroy();
});

await window.addEventListener('keydown', async (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        console.log('Ctrl+S pressed! Saving data...');
        e.preventDefault();
        let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);
        await commands.saveTasks(incompleteTasks);
        console.log('Saved');
        // Add your save logic or invoke a Tauri command here
    }
});

render(() => <App />, document.getElementById("root") as HTMLElement);
