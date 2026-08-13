// SolidJS imports
import { batch } from "solid-js";

// App context imports
import AppContext from "./context/AppSettings";


// Props Type definition
type TimeEntryProps = {
    timeEntryCallback: (hrs: number) => void,
    requestSuspendCallback: (suspend: boolean) => void,
    extend: boolean,
}

// TODO_ separate onSubmit lambda to external function
export default function TimeEntry(props: TimeEntryProps) {
    return (
        <form
            class="time-entry framed row"
            classList={{ extended: props.extend }}
            onSubmit={(e) => {
                e.preventDefault();
                let button = new FormData(e.currentTarget, e.submitter).get("action");
                let hours = (new FormData(e.currentTarget).get("hr-input") ?? 0.0) as number;
                setTimeout(() => {
                    batch(() => {
                        props.timeEntryCallback(hours);
                        props.requestSuspendCallback(button == "suspend");
                    });
                }, 100);
            }}>
            <input
                type="number"
                step=".01"
                id="real-hrs"
                name="hr-input"
                min={AppSettings.minimumRotationCost * (1 - AppSettings.minWorkTimeMarginOfError)}
                max={
                    // Allow up to a configurable margin of error
                    AppContext.calculatedTimeSlice() * (1 + AppSettings.maxWorkTimeMarginOfError)
                }
                value={AppContext.calculatedTimeSlice()}
            />
            <button
                class="overflow-button"
                type="submit"
                name="action"
                value="rotate"
            >
                Rotate task
            </button>
            <button
                class="overflow-button"
                type="submit"
                name="action"
                value="suspend"
            >
                Rotate and suspend
            </button>
        </form>
    );
}