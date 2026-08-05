// SolidJS imports
import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

// App general imports
import { Workspace } from "../../models/bindings";

// Comparison function for workspaces
function compareWorkspace(left: Workspace, right: Workspace) {
    return left.id - right.id;
}

// Workspace sorting function
function sortWorkspaces(list: Workspace[], setterFunction: (list: Workspace[]) => void) {
    let copyList = [...list];
    copyList.sort(compareWorkspace);
    setterFunction([...copyList]);
}

// Workspace context definition (SolidJS convention)
function createGlobalWorkspaceList() {
    const [workspaces, setWorkspaces] = createStore<Workspace[]>([]);

    const batchAddWorkspaces = (list: Workspace[]) => {
        let newWorkspaces = new Set<Workspace>();
        workspaces.forEach(newWorkspaces.add, newWorkspaces);
        list.forEach(newWorkspaces.add, newWorkspaces);
        setWorkspaces([...newWorkspaces]);
        sortWorkspaces(workspaces, setWorkspaces);
    }

    const addWorkspace = (workspace: Workspace) => {
        setWorkspaces([...workspaces, workspace])
    }

    const batchDeleteWorkspaces = (list: number[]) => {
        setWorkspaces(workspaces.filter((v) => !list.includes(v.id)));
    }

    return { workspaces, batchAddWorkspaces, addWorkspace, batchDeleteWorkspaces };
}

export default createRoot(createGlobalWorkspaceList);