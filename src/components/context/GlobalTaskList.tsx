// SolidJS imports
import { batch, createRoot, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

// General App imports
import { Task } from "../../models/bindings";
import { allocateId, createIdAllocator, freeId, IdAllocator } from "./IdAllocator";

// App context imports
import SettingsContext from "./AppSettings";

// Comparison function for tasks
function compareTasks(left: Task, right: Task) {
    if (left.completed !== right.completed) {
        return left.completed ? 1 : -1;
    }
    if (left.is_suspended !== right.is_suspended) {
        return left.is_suspended ? 1 : -1;
    }
    if (left.vruntime !== right.vruntime) {
        return left.vruntime - right.vruntime;
    }
    if (left.priority !== right.priority) {
        return left.priority - right.priority;
    }

    return left.id - right.id;
}

// Task sorting function
function sortTasks(list: Task[], setterFunction: (list: Task[]) => void) {
    let copyList = [...list];
    copyList.sort(compareTasks);

    let topRuntime = copyList[0]?.vruntime ?? 0;

    setterFunction(copyList.map(item => {
        if (item.is_suspended || item.completed) {
            return item;
        }

        return { ...item, vruntime: Math.max(item.vruntime - topRuntime, 0) } as Task;
    }));
}


// Task list context definiton
function createGlobalTaskList() {
    const [tasks, setTasks] = createStore<Task[]>([]);
    const [IdAllocator, setIdAllocator] = createSignal<IdAllocator>({} as IdAllocator);

    onMount(() => {
        SettingsContext.calculateNewTimeSlice(tasks);
    });

    const addTask = (text: string, priority: number, tags: string[]) => {
        batch(() => {
            const newId = allocateId(IdAllocator());
            setTasks([...tasks, { id: newId, text: text, completed: false, is_suspended: false, vruntime: 0.0, priority: priority, tags: tags }]);
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })

    }

    const batchAddTasks = (list: Task[]) => {
        let newTasks = new Set<Task>();
        tasks.forEach(newTasks.add, newTasks);
        list.forEach(newTasks.add, newTasks);
        batch(() => {
            setTasks([...newTasks]);
            sortTasks(tasks, setTasks);
            SettingsContext.calculateNewTimeSlice(tasks);
            setIdAllocator(createIdAllocator([...newTasks].map((v) => v.id).sort()));
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
                "is_suspended",
                is_suspended => !forceResume && !is_suspended
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

        let taskPriority = task.priority;
        let runtimeMultiplier = Math.pow(2, taskPriority);

        batch(() => {
            setTasks(
                (task) => task.id === id,
                "vruntime",
                vruntime => vruntime + Math.max(runtime * runtimeMultiplier, globalThis.AppSettings.minimumRotationCost)
            )
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
        })
    }

    const removeTask = (id: number) => {
        batch(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            SettingsContext.calculateNewTimeSlice(tasks);
            sortTasks(tasks, setTasks);
            freeId(IdAllocator(), id);
            console.log(IdAllocator());
        })
    }

    return {
        tasks,
        addTask,
        batchAddTasks,
        toggleTask,
        suspendResumeTask,
        rotateTask,
        removeTask
    };
}

export default createRoot(createGlobalTaskList);