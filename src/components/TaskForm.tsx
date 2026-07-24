import TaskContext from "./context/GlobalTaskList"

function TaskForm() {
    const { addTask } = TaskContext;

    return (
        <form
            class="row"
            onSubmit={(e) => {
                e.preventDefault();
                let form = new FormData(e.currentTarget);
                let text = form.get("input")?.toString();
                let priority = (form.get("priority-input") ?? 0.0) as number;
                e.currentTarget.reset();

                if (text == null) {
                    throw "Bad input on task form data";
                }

                if (text.length === 0 || priority === 0) {
                    return; // If empty do not throw but don't save it.
                }

                addTask(text, priority);
            }}
        >
            <div class="large form-with-title" >
                <p>Task</p>
                <input
                    id="task-input"
                    name="input"
                    placeholder="Enter a task..."
                />
            </div>
            <div class="medium form-with-title">
                <p>Priority</p>
                <input
                    id="priority-input"
                    name="priority-input"
                    type="number"
                    value="10"
                />
            </div>
            <button type="submit" style="height: fit-content; align-self:flex-end;">Add</button>
        </form>
    )
}

export default TaskForm;