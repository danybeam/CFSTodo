import { createRoot, createSignal } from "solid-js";
import { Task } from "../../models/Task";

declare global {
    var AppSettings: {
        availableHours: 35.0;
        minimumScheduleSlice: 4.0;
    };
}

function createSettings() {
    const [calculatedTimeSlice, setCalculatedTimeSlice] = createSignal(0);

    const calculateNewTimeSlice = (list: Task[]) => {
        // TODO filter task list to not count completed tasks
        let timeSlice = Math.max(globalThis.AppSettings.availableHours / Math.max(list.length, 1.0), globalThis.AppSettings.minimumScheduleSlice);
        setCalculatedTimeSlice(timeSlice);
    }


    return { calculatedTimeSlice, calculateNewTimeSlice };
}

export default createRoot(createSettings);