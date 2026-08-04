import { createRoot } from "solid-js";
import { Workspace } from "../../models/bindings";
import { createStore } from "solid-js/store";

function compareWorkspace(left: Workspace, right: Workspace) {
    return left.id - right.id;
}

function sortWorkspaces(list: Workspace[], setterFunction: (list: Workspace[]) => void) {
    let copyList = [...list];
    copyList.sort(compareWorkspace);
    setterFunction([...copyList]);
}


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

    return { workspaces, batchAddWorkspaces, addWorkspace };
}

export default createRoot(createGlobalWorkspaceList);