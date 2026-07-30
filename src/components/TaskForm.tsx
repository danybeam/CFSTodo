import { createStore } from "solid-js/store";
import TaskContext from "./context/GlobalTaskList"
import TaskFormTags from "./TaskFromTags";


function TaskForm() {
    const { addTask } = TaskContext;
    const [tags, setTags] = createStore<string[]>([]);
    let tags_set = new Set<string>();

    return (
        <div style="display: flex;flex-flow:column nowrap;">
            <form
                class="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    let form = new FormData(e.currentTarget);
                    let text = form.get("input")?.toString();
                    let priority: number = Number(form.get("priority-input") ?? 0.0);
                    e.currentTarget.reset();

                    if (text == null) {
                        throw "Bad input on task form data";
                    }

                    if (text.length === 0 || priority === 0) {
                        return; // If empty do not throw but don't save it.
                    }

                    addTask(text, priority, [...tags]);
                    setTags([]);
                    tags_set.clear();
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
                        min="0"
                        max="500"
                    />
                </div>
                <button type="submit" style="height: fit-content; align-self:flex-end;">Add</button>
            </form>
            <TaskFormTags
                tags={tags}
                addTagCallback={(newTag: string) => {
                    tags_set.add(newTag);
                    setTags([...tags_set])
                }}
                removeTagCallback={(tag: string) => {
                    tags_set.delete(tag);
                    setTags([...tags_set]);
                }}
            />
        </div>
    )
}

export default TaskForm;