/* @refresh reload */

// Tauri imports
import { Menu, MenuItem, Submenu } from '@tauri-apps/api/menu';
import { getCurrentWindow } from "@tauri-apps/api/window";
import { platform } from '@tauri-apps/plugin-os';

// SolidJS imports
import { render } from "solid-js/web";

// App imports
import App from "./App";
import TaskContext from "./components/context/GlobalTaskList";
import WorkspaceContext from "./components/context/WorkspaceList";
import { commands } from "./models/bindings";


///////////////////////////////////////////////////////////////////
//        SETUP APP
///////////////////////////////////////////////////////////////////

// App Menu
// Will become the application submenu on MacOS
const aboutSubmenu: Submenu = await Submenu.new({
    text: 'About',
    items: [
        await MenuItem.new({
            id: 'quit',
            text: 'Quit',
            action: (_: string) => {
                getCurrentWindow().emit('tauri://close-requested');
            },
        }),
    ],
});

const fileSubmenu: Submenu = await Submenu.new({
    text: 'File',
    items: [
        await MenuItem.new({
            id: 'save-item',
            text: 'Save\tCtrl+S',
            action: async (_: string) => {
                await commands.saveTasks(TaskContext.tasks);
            }
        })
    ]
});

let subMenus = [fileSubmenu];
if (platform() === 'macos' && aboutSubmenu) {
    subMenus = [aboutSubmenu, ...subMenus];
}

const menu = await Menu.new({ items: subMenus });


// If a window was not created with an explicit menu or had one set explicitly,
// this menu will be assigned to it.

await menu.setAsAppMenu();


///////////////////////////////////////////////////////////////////
//        SETUP EVENT LISTENERS
///////////////////////////////////////////////////////////////////


// App listeners
const appWindow = getCurrentWindow();
await appWindow.listen('tauri://close-requested', async (_) => {
    let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);

    await commands.saveTasks(incompleteTasks);
    await commands.saveWorkspaces(WorkspaceContext.workspaces);

    // doesn't close program but effectively closes program
    appWindow.destroy();
});

await window.addEventListener('keydown', async (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        let incompleteTasks = TaskContext.tasks.filter(t => !t.completed);
        await commands.saveTasks(incompleteTasks);
        await commands.saveWorkspaces(WorkspaceContext.workspaces);
        // Add your save logic or invoke a Tauri command here
    }
});

///////////////////////////////////////////////////////////////////
//        START APP
///////////////////////////////////////////////////////////////////

render(() => <App />, document.getElementById("root") as HTMLElement);
