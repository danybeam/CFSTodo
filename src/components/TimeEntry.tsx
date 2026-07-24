import { createSignal } from "solid-js";

import AppContext from "./context/AppSettings"

type TimeEntryProps = {
    timeEntryCallback: (hrs: number) => void
    requestSuspendCallback: (suspend: boolean) => void
}

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
                    props.timeEntryCallback(hours);
                    props.requestSuspendCallback(button == "suspend");
                }, 100);
                setPopup(false);
            }}>
            <input
                type="number"
                id="real-hrs"
                name="hr-input"
                value={AppContext.calculatedTimeSlice()}
            />
            <button type="submit" name="action" style="width: fit-content" value="rotate">Rotate Task</button>
            <button type="submit" name="action" style="width: fit-content" value="suspend">Rotate Task</button>
        </form>
    );
}