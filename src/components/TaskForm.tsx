// SolidJS imports
import { batch } from "solid-js";
import { createStore } from "solid-js/store";

// App context imports
import TaskContext from "./context/GlobalTaskList";

// App components imports
import TaskFormTags from "./TaskFromTags";

type TaskFormProps = {
    onSubmitCallback: () => void
}

// TODO_ extract on submit lambda to external function
// TODO_ extract addTagCallback lambda to external function
// TODO_ extract removeTagCallback lambda to external function
function TaskForm(props: TaskFormProps) {
    const { addTask } = TaskContext;
    const [tags, setTags] = createStore<string[]>([]);
    let tags_set = new Set<string>();

    return (
        <div style="display: flex;flex-flow:column nowrap;">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    let form = new FormData(e.currentTarget);
                    let text = form.get("input")?.toString() ?? "";
                    let extendedText = form.get("extended-input")?.toString() ?? "";
                    let priority: number = Number(form.get("priority-input") ?? 0.0);
                    e.currentTarget.reset();

                    if (text == null) {
                        throw "Bad input on task form data";
                    }

                    if (text.length === 0 || priority === 0) {
                        return; // If empty do not throw but don't save it.
                    }

                    batch(() => {
                        addTask(text, extendedText, priority, [...tags]);
                        setTags([]);
                        tags_set.clear();
                        props.onSubmitCallback();
                    });
                }}
            >
                <div class="row">
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
                </div>
                <div style="height:10px;"/>
                <textarea
                    id="task-extended-text"
                    name="extended-input"
                    placeholder="Task description"
                    rows="4"
                    wrap="soft"
                />
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