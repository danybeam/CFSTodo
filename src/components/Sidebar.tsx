import { createSignal } from "solid-js";
import { PageView } from "../models/Enums";

type SidebarProps = {
    setTab: (page: PageView, pageId: number) => void;
}

export default function Sidebar(props: SidebarProps) {
    const [collapsed, setCollapsed] = createSignal(true);
    return (
        <>
            <div class="sidebar dummy" classList={{ collapsed: collapsed() }} />
            <aside class="sidebar fixed" classList={{ collapsed: collapsed() }}>
                <button onClick={() => setCollapsed(!collapsed())}>
                    ☰
                </button>
                <button onClick={() => props.setTab(PageView.WorkspaceBuilder, -1)}>
                    {collapsed() ? "🔨" : "🔨 Builder"}
                </button>
                <button onClick={() => props.setTab(PageView.DefaultTaskList, -1)}>
                    {collapsed() ? "📃" : "📃 Default List"}
                </button>
                <button onClick={() => props.setTab(PageView.Workspace, 0)}>
                    {collapsed() ? "T" : "📃 Default List"}
                </button>
            </aside>
        </>
    );
}