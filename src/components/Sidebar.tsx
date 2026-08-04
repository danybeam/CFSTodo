import { createSignal } from "solid-js";

export default function Sidebar() {
    const [collapsed, setCollapsed] = createSignal(true);
    return (
        <>
            <div class="sidebar dummy" classList={{ collapsed: collapsed() }} />
            <aside class="sidebar fixed" classList={{ collapsed: collapsed() }}>
                <button onClick={() => setCollapsed(!collapsed())}>
                    ☰
                </button>
            </aside>
        </>
    );
}