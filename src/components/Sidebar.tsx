import { createSignal, For } from "solid-js";
import { PageView } from "../models/Enums";

import WorkspaceContext from "./context/WorkspaceList";
import { Workspace } from "../models/bindings";

type SidebarProps = {
    setTab: (page: PageView, pageId: number) => void;
}

function getEmojiOrShortName(w: Workspace) {
    if (w.icon_id) {
        return w.icon_id;
    }

    let parts = w.name.split(/[ _-]/);
    let result = parts[0][0];
    for (let i = 1; (parts[i] != null) && (parts[i].length > 0) && i < 4; i++) {
        result += parts[i][0];
    }
    return result.toUpperCase();
}

export default function Sidebar(props: SidebarProps) {
    const [collapsed, setCollapsed] = createSignal(true);
    const [collapsedButtons, setCollapsedButtons] = createSignal(true);

    return (
        <>
            <div class="sidebar dummy" classList={{ collapsed: collapsed() }} />
            <aside class="sidebar fixed" classList={{ collapsed: collapsed() }}>
                <button onClick={() => {
                    setCollapsed(!collapsed());
                    setTimeout(() => setCollapsedButtons(!collapsedButtons()), collapsed() ? 0 : 200);
                }}>
                    ☰
                </button>
                <button onClick={() => props.setTab(PageView.WorkspaceBuilder, -1)}>
                    {collapsedButtons() ? "🔨" : "🔨 Builder"}
                </button>
                <button onClick={() => props.setTab(PageView.DefaultTaskList, -1)}>
                    {collapsedButtons() ? "📃" : "📃 Default List"}
                </button>
                <For each={WorkspaceContext.workspaces}>{(w, _) => {
                    return <>
                        <button class="small-padding" onClick={() => props.setTab(PageView.Workspace, w.id)}>
                            {collapsedButtons() ? getEmojiOrShortName(w) : w.name}
                        </button>
                    </>
                }
                }
                </For>
            </aside>
        </>
    );
}