import { createRoot, createSignal } from "solid-js";
import { Task } from "../../models/Task";

declare global {
    var AppSettings: {
        availableHours: number;
        minimumScheduleSlice: number;
        minimumRotationCost: number;
    };
}

function initializeSettings() {
    globalThis.AppSettings = {
        availableHours: 35.0,
        minimumScheduleSlice: 4.0,
        minimumRotationCost: 1.0
    }
}

function createSettings() {
    initializeSettings();

    const [calculatedTimeSlice, setCalculatedTimeSlice] = createSignal(0);
    const [isOverburdened, setIsOverburdened] = createSignal(false);

    const calculateNewTimeSlice = (list: Task[]) => {
        let filteredList = list.filter((item) => !item.completed);
        let candidateTimeSlice = globalThis.AppSettings.availableHours / Math.max(filteredList.length, 1.0);

        let timeSlice = Math.max(candidateTimeSlice, globalThis.AppSettings.minimumScheduleSlice);
        setCalculatedTimeSlice(timeSlice);
        setIsOverburdened(candidateTimeSlice < globalThis.AppSettings.minimumScheduleSlice);
    }


    return { calculatedTimeSlice, calculateNewTimeSlice, isOverburdened };
}

export default createRoot(createSettings);