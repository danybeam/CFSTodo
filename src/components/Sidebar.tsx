// SolidJS imports
import { batch, createEffect, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

// General App imports
import { PageView } from "../models/Enums";

// App context imports
import WorkspaceContext from "./context/WorkspaceList";

// App components imports
import { Workspace } from "../models/bindings";

// Props type definiton
type SidebarProps = {
    setTab: (page: PageView, pageId: number) => void;
}

// TODO_ update workspace.id to take an emoji instead of the id for an icon
function getEmojiOrShortName(w: Workspace) {
    if (w.iconId) {
        return w.iconId;
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
    const [firstToggle, setFirstToggle] = createSignal(false);
    const [collapsedButtons, setCollapsedButtons] = createSignal(true);

    const [deleteMode, setDeleteMode] = createSignal(false);

    const [selectedWorkspaces, setSelectedWorkspaces] = createStore<number[]>([]);

    const [currentTab, setCurrentTab] = createSignal(-1);

    // TODO_ extract in-function function to external function
    let toggleSelected = (selected: boolean, workspace: number) => {
        if (selected) {
            setSelectedWorkspaces([...selectedWorkspaces, workspace]);
        } else {
            setSelectedWorkspaces(selectedWorkspaces.filter((v) => v != workspace));
        }
    }

    // TODO_ Extract workspace toggle button to separate components
    // TODO_ Extract delete mode lambda to function
    return (
        <>
            <div class="sidebar dummy" classList={{ collapsed: firstToggle() && collapsed(), firstToggle: !firstToggle() }} />
            <aside class="sidebar fixed" classList={{ collapsed: firstToggle() && collapsed(), firstToggle: !firstToggle() }}>
                <button onClick={() => {
                    setCollapsed(!collapsed());
                    setFirstToggle(true);
                    setTimeout(() => setCollapsedButtons(!collapsedButtons()), collapsed() ? 0 : 200);
                }}>
                    ☰
                </button>
                <div class="row">
                    <Show when={!deleteMode()}>
                        <button onClick={() => props.setTab(PageView.WorkspaceBuilder, -1)} style="flex-grow:1;">
                            {collapsedButtons() ? "🔨" : "🔨 Builder"}
                        </button>
                    </Show>
                    <Show when={!collapsed()}>
                        <button
                            style="flex-grow:1;"
                            onClick={() => {
                                if (!deleteMode()) {
                                    setDeleteMode(true);
                                } else if (selectedWorkspaces.length == 0) {
                                    setDeleteMode(false);
                                } else if (confirm("Are you sure you want to delete the selected workspaces?")) {
                                    batch(() => {
                                        WorkspaceContext.batchDeleteWorkspaces(selectedWorkspaces);
                                        setDeleteMode(false);
                                        if (selectedWorkspaces.includes(currentTab())) {
                                            props.setTab(PageView.DefaultTaskList, -1);
                                        }
                                        setSelectedWorkspaces([]);
                                    })
                                }
                            }}
                        >
                            {
                                collapsedButtons() ? "" : deleteMode() ? "Delete selected" : "Select workspaces for deletion"
                            }
                        </button>
                    </Show>
                    <Show when={deleteMode()}>
                        <button
                            style="flex-grow:1;"
                            onClick={() => {
                                batch(() => {
                                    setDeleteMode(false);
                                    setSelectedWorkspaces([]);
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </Show>
                </div>
                <button onClick={() => props.setTab(PageView.DefaultTaskList, -1)}>
                    {collapsedButtons() ? "📃" : "📃 Default List"}
                </button>
                <For each={WorkspaceContext.workspaces}>{(w, _) => {
                    const [selected, setSelected] = createSignal(false);

                    createEffect(() => {
                        if (!deleteMode()) {
                            setSelected(false);
                        }
                    });

                    return <>
                        <button
                            class="small-padding"
                            classList={{ selected: selected() }}
                            onClick={() => {
                                if (deleteMode()) {
                                    batch(() => {
                                        setSelected(!selected());
                                        toggleSelected(selected(), w.id);
                                    });
                                } else {
                                    batch(() => {
                                        props.setTab(PageView.Workspace, w.id)
                                        setCurrentTab(w.id);
                                    });
                                }
                            }}>
                            {collapsedButtons() ? getEmojiOrShortName(w) : w.name}
                        </button>
                    </>
                }
                }
                </For>
            </aside >
        </>
    );
}