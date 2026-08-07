// SolidJS imports
import { batch, createRoot, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

// General App imports
import { Task } from "../../models/bindings";
import { allocateId, createIdAllocator, freeId, IdAllocator } from "./IdAllocator";

// App context imports
import SettingsContext from "./AppSettings";

// Useful constants
export const MiddleWeight = getWeight(20);

// Function for calculating weights
export function getWeight(nice: number) {
    return 1024 / Math.pow(1.25, nice - 20);
}

// Function for calculating vruntime
function calculateRuntime(realRuntime: number, taskWeight: number, previousRuntime: number) {
    let result = previousRuntime + (realRuntime * (taskWeight / MiddleWeight));
    return result;
}

// Comparison function for tasks
function compareTasks(left: Task, right: Task) {
    if (left.completed !== right.completed) {
        return left.completed ? 1 : -1;
    }
    if (left.isSuspended !== right.isSuspended) {
        return left.isSuspended ? 1 : -1;
    }
    if (left.vruntime !== right.vruntime) {
        return left.vruntime! - right.vruntime!;
    }
    if (left.priority !== right.priority) {
        return left.priority - right.priority;
    }

    return left.id - right.id;
}

function compareTasksById(left: Task, right: Task) {
    return left.id - right.id;
}

// Task sorting function
function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let copyList = [...list];
    copyList.sort(compareTasks);

    setterFunction(copyList);
}


// Task list context definiton
function createGlobalTaskList() {
    // Public
    const [tasks, setTasks] = createStore<Task[]>([]);
    const [taskInfo, setTaskInfo] = createSignal<Task>();
    const [showTaskInfo, setShowTaskInfo] = createSignal(false);

    // Private
    const [IdAllocator, setIdAllocator] = createSignal<IdAllocator>({} as IdAllocator);

    // Public
    onMount(() => {
        SettingsContext.calculateNewTimeSlice(tasks);
    });

    const addTask = (text: string, extendedText: string, priority: number, tags: string[]) => {
        batch(() => {
            const newId = allocateId(IdAllocator());
            setTasks([
                ...tasks,
                {
                    id: newId,
                    text: text,
                    extendedText: extendedText,
                    completed: false,
                    isSuspended: false,
                    vruntime: 0.0,
                    priority: priority,
                    tags: tags,
                    weight: getWeight(priority)
                }
            ]);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);

        })

    }

    const batchAddTasks = (list: Task[], sortTasksById: boolean = false) => {
        let newTasks = new Set<Task>();
        tasks.forEach(newTasks.add, newTasks);
        list.forEach(newTasks.add, newTasks);
        let newTasksForAllocator = [...newTasks];
        batch(() => {
            setTasks([...newTasksForAllocator]);
            sortTasks(tasks, setTasks);
            SettingsContext.calculateNewTimeSlice(tasks);

            if (sortTasksById) {
                newTasksForAllocator.sort(compareTasksById);
            }

            setIdAllocator(createIdAllocator([...newTasksForAllocator].map((v) => v.id)));
        });
    }

    const toggleTask = (id: number) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "completed",
                completed => !completed
            )
            suspendResumeTask(id, true);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    const suspendResumeTask = (id: number, forceResume: boolean = false) => {
        batch(() => {
            setTasks(
                (task) => task.id === id,
                "isSuspended",
                isSuspended => !forceResume && !isSuspended
            )
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    const rotateTask = (id: number, runtime: number) => {
        let task = tasks.find((t) => t.id === id);
        if (task == null) {
            return;
        }

        batch(() => {
            setTasks(
                (task) => task.id === id,
                "vruntime",
                vruntime => calculateRuntime(runtime, task.weight!, vruntime!)
            )
            sortTasks(tasks, setTasks);
        })
    }

    const normalizeTasks = (list: Task[]) => {
        if (list.length == 0) {
            return;
        }

        let topRuntime = list[0].vruntime;

        batch(() => {
            for (let task of list) {
                if (task.completed || task.isSuspended) {
                    continue;
                }

                setTasks(
                    (t) => task.id === t.id,
                    "vruntime",
                    vruntime => vruntime! - topRuntime!
                )
            }
        })
    };

    const removeTask = (id: number) => {
        batch(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
            freeId(IdAllocator(), id);
        })
    }

    return {
        tasks,
        addTask,
        batchAddTasks,
        toggleTask,
        normalizeTasks,
        suspendResumeTask,
        rotateTask,
        removeTask,
        taskInfo,
        setTaskInfo,
        showTaskInfo,
        setShowTaskInfo
    };
}

export default createRoot(createGlobalTaskList);