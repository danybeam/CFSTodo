// SolidJS imports
import { batch, createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";

// App context imports
import TaskContext from "./context/GlobalTaskList";
import TagContainer from "./Tags/TagContainer";


function closeTaskInfo() {
    batch(() => {
        TaskContext.setShowTaskInfo(false);
        TaskContext.setTaskInfo(undefined);
    });
}

export default function TaskInfoSidebar() {

    const [endTransition, setEndTranstion] = createSignal(false);
    const [timerId, setTimerId] = createSignal(-1);

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
                <RealContents />
            </Show>
        </div>
    </>
}

function RealContents(props: any) {
    return <>
        <h1>{TaskContext.taskInfo()?.text}</h1>
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