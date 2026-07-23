type TimeEntryProps = {

}

// TODO change submit button to rotate and  rotate and suspend
// TODO change default value to current slice time
// Needs callback to tell task list item how much time to add
export default function TimeEntry(props: TimeEntryProps) {
    return (
        <form class="popup row"
            onSubmit={(e) => {
                e.preventDefault();
                console.log("submited")
            }}>
            <input
                type="number"
                id="real-hrs"
                name="hr-input"
                value="1"
            />
            <button type="submit" style="width: fit-content">Submit</button>
        </form>
    );
}