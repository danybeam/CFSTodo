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
                    Builder
                </button>
                <button onClick={() => props.setTab(PageView.DefaultTaskList, -1)}>
                    List
                </button>
                <button onClick={() => props.setTab(PageView.Workspace, -1)}>
                    Specific workspace
                </button>
            </aside>
        </>
    );
}