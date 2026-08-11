// SolidJS imports
import { batch, createEffect, createSignal, Match, Show, Switch } from "solid-js";

// App context imports
import { Task } from "../models/bindings";
import TaskContext from "./context/GlobalTaskList";
import TagContainer from "./Tags/TagContainer";
import TaskFormTags from "./Tags/TaskFormTags";


function closeTaskInfo() {
    batch(() => {
        TaskContext.setShowTaskInfo(false);
        TaskContext.setTaskInfo(undefined);
    });
}

export default function TaskInfoSidebar() {

    const [endTransition, setEndTranstion] = createSignal(false);
    const [timerId, setTimerId] = createSignal(-1);
    const [editMode, setEditMode] = createSignal(false);

    const toggleEditMode = () => {
        setEditMode(!editMode());
    }

    createEffect(() => {
        if (!TaskContext.showTaskInfo()) {
            clearTimeout(timerId());
            return;
        }

        batch(() => {
            setEndTranstion(false);
            setTimerId(setTimeout(() => setEndTranstion(true), 300));
        }
        )
    });

    return <>
        <div
            class="blocking-background"
            classList={{ extended: TaskContext.showTaskInfo() }}
            onClick={closeTaskInfo}
        />
        <div
            class="framed task-info-sidebar"
            classList={{ extended: TaskContext.showTaskInfo() }}
        >
            <Show
                when={TaskContext.showTaskInfo() && endTransition()}
                fallback={<FallbackContents />}
            >
                <Switch>
                    <Match when={!editMode()}>
                        <RealContents toggleEditMode={toggleEditMode} />
                    </Match>
                    <Match when={editMode()}>
                        <EditModeContents toggleEditMode={toggleEditMode} />
                    </Match>
                </Switch>
            </Show>
        </div>
    </>
}

function RealContents(props: any) {
    return <>
        <h1>{TaskContext.taskInfo()?.text}</h1>
        <h2>Priority:</h2>
        <p>{TaskContext.taskInfo()?.priority}</p>
        <h2>Details:</h2>
        <p class="framed task-info-contents">
            {
                TaskContext.taskInfo()?.extendedText.length ?
                    TaskContext.taskInfo()?.extendedText :
                    "No description"
            }
        </p>
        <h2>Tags:</h2>
        <TagContainer
            tags={TaskContext.taskInfo()?.tags}
            lighter={true}
        />
        <div style="height: 35%;"></div>
        <button style="align-self: flex-end;" onClick={() => props.toggleEditMode()}>Edit</button>
    </>
}

function EditModeContents(props: any) {
    const [editingTask, setEditingTask] = createSignal({ ...TaskContext.taskInfo() ?? ({} as Task) });
    const [originalName, _] = createSignal(editingTask().text);

    return <>
        <h1 style="width:75%;">
            <input
                placeholder={editingTask().text}
                onInput={(e) => {
                    let name = e.currentTarget.value;
                    if (name.trim().length == 0) {
                        setEditingTask({ ...editingTask(), text: originalName() });
                        return;
                    }

                    setEditingTask({ ...editingTask(), text: name.trim() });
                }}
                style="background-color: #262626; width:100%"
            />
        </h1>
        <h2>Priority:</h2>
        <input
            id="priority-input"
            name="priority-input"
            type="number"
            value="20"
            min="0"
            max="40"
            onInput={(e) => {
                let newPriority = Number(e.target.value);
                newPriority = Math.min(Math.max(newPriority, 1), AppSettings.maxPriority)
                e.target.value = String(newPriority);
                setEditingTask({ ...editingTask(), priority: newPriority })
            }}
        />
        <h2>Details:</h2>
        <textarea
            id="task-extended-text"
            name="extended-input"
            placeholder="Task description"
            rows="4"
            wrap="soft"
            style="background-color: #262626; width:85%"
            onInput={(e) => {
                setEditingTask({ ...editingTask(), extendedText: e.target.value })
            }}
        />
        <h2>Tags:</h2>
        <TaskFormTags
            tags={editingTask().tags ?? []}
            hideTagsLabel={true}
            addTagCallback={(newTag) => {
                let newTags = new Set<string>([...editingTask().tags ?? []]);
                newTags.add(newTag);
                setEditingTask({ ...editingTask(), tags: [...newTags] });
            }}
            removeTagCallback={(tag) => {
                let tags = [...editingTask().tags!];
                setEditingTask({ ...editingTask(), tags: tags.filter((v) => v != tag) });
            }}
        />
        <div style="height: 35%;"></div>
        <div class="row" style="justify-content:space-evenly;">
            <button onClick={() => {
                batch(() => {
                    TaskContext.updateTask(editingTask())
                    props.toggleEditMode();
                });
            }}>Save</button>
            <button onClick={() => props.toggleEditMode()}>Cancel</button>
        </div>
    </>
}

function FallbackContents() {
    return <>
        <h1 class="first medium placeholder-block" />
        <h2 class="placeholder-block" />
        <p class="big placeholder-block" />
        <h2 class="placeholder-block" />
        <div class="last medium-big placeholder-block" />
    </>
}