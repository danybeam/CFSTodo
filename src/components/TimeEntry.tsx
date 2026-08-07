// SolidJS imports
import { batch, createSignal } from "solid-js";

// App context imports
import AppContext from "./context/AppSettings";


// Props Type definition
type TimeEntryProps = {
    timeEntryCallback: (hrs: number) => void
    requestSuspendCallback: (suspend: boolean) => void
}

// TODO_ separate onSubmit lambda to external function
export default function TimeEntry(props: TimeEntryProps) {
    const [popup, setPopup] = createSignal(true);
    return (
        <form
            class="row"
            classList={{ popup: popup(), popdown: !popup() }}
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
                setPopup(false);
            }}>
            <input
                type="number"
                step=".01"
                id="real-hrs"
                name="hr-input"
                min={AppSettings.minimumRotationCost * (1 - AppSettings.minWorkTimeMarginOfError)}
                max={
                    // Allow up to 20% margin of error
                    AppContext.calculatedTimeSlice() * (1 + AppSettings.maxWorkTimeMarginOfError)
                }
                value={AppContext.calculatedTimeSlice()}
            />
            <button type="submit" name="action" style="width: fit-content" value="rotate">Rotate Task</button>
            <button type="submit" name="action" style="width: fit-content" value="suspend">Rotate and suspend</button>
        </form>
    );
}