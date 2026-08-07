// SolidJS imports
import { createRoot, createSignal } from "solid-js";

// General App imports
import { Task } from "../../models/bindings";


// TODO_ Replace with proper settings after configuration screen is done
declare global {
    var AppSettings: {
        availableHours: number;
        minimumScheduleSlice: number;
        minimumRotationCost: number;
        maxWorkTimeMarginOfError: number;
        minWorkTimeMarginOfError: number;
    };
}

function initializeSettings() {
    globalThis.AppSettings = {
        availableHours: 100.0, // TODO! return to 35hrs per week
        minimumScheduleSlice: 4.0,
        minimumRotationCost: 1.0,
        maxWorkTimeMarginOfError: 0.2,
        minWorkTimeMarginOfError: 0.2
    }
}

function createSettings() {
    initializeSettings();

    const [calculatedTimeSlice, setCalculatedTimeSlice] = createSignal(0);

    const [isOverburdened, setIsOverburdened] = createSignal(false);

    const calculateNewTimeSlice = (list: Task[]) => {
        let filteredList = list.filter((item) => !item.completed && !item.isSuspended);

        if (filteredList.length === 0) {
            setCalculatedTimeSlice(0);
            setIsOverburdened(false);
            return;
        }

        let totalWeight = 0;

        for (let task of filteredList) {
            totalWeight = totalWeight + task.weight!;
        }

        let candidateTimeSlice = globalThis.AppSettings.availableHours * (filteredList[0].weight! / totalWeight);

        let timeSlice = Math.max(candidateTimeSlice, globalThis.AppSettings.minimumScheduleSlice);
        setCalculatedTimeSlice(Math.floor(timeSlice));
        setIsOverburdened(candidateTimeSlice < globalThis.AppSettings.minimumScheduleSlice);
    }


    return { calculatedTimeSlice, calculateNewTimeSlice, isOverburdened };
}

export default createRoot(createSettings);