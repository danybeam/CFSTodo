type TimeEntryProps = {
    timeEntryCallback: (hrs: number) => void
    requestSuspendCallback: (suspend: boolean) => void
}

export default function TimeEntry(props: TimeEntryProps) {
    return (
        <form class="popup row"
            onSubmit={(e) => {
                e.preventDefault();
                let button = new FormData(e.currentTarget, e.submitter).get("action");
                let hours = (new FormData(e.currentTarget).get("hr-input") ?? 0.0) as number;
                props.timeEntryCallback(hours);
                props.requestSuspendCallback(button == "suspend");
            }}>
            <input
                type="number"
                id="real-hrs"
                name="hr-input"
                value="1"
            />
            <button type="submit" name="action" style="width: fit-content" value="rotate">Rotate Task</button>
            <button type="submit" name="action" style="width: fit-content" value="suspend">Rotate Task</button>
        </form>
    );
}