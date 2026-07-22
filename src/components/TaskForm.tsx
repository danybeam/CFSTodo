import TaskContext from "./context/GlobalTaskList"

function TaskForm() {
    const {addTask} = TaskContext;

    return (
        <form
            class="row"
            onSubmit={(e) => {
                e.preventDefault();
                let text = new FormData(e.currentTarget).get("input")?.toString();

                if (text == null) {
                    throw "Bad input on task form data";
                }

                if (text.length === 0) {
                    return; // If empty do not throw but don't save it.
                }

                addTask(text);
            }}
        >
            <input
                id="task-input"
                name="input"
                placeholder="Enter a task..."
            />
            <button type="submit">Add</button>
        </form>
    )
}

export default TaskForm;