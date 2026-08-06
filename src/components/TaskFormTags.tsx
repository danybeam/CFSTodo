// SolidJS imports
import { For } from "solid-js";

// Props type definition
type TaskFormTagsProps = {
    tags: string[],
    addTagCallback: (newTag: string) => void,
    removeTagCallback: (tag: string) => void,
}

// TODO_ extract form submit event to external function
export default function TaskFormTags(props: TaskFormTagsProps) {
    return (
        <div class="tag-form">
            <div class="framed tag-container">
                <For each={props.tags}>{
                    (tag) => <div class="tag">
                        <p>
                            {tag}
                        </p>
                        <button class="fake-button" onclick={() => { props.removeTagCallback(tag); }}>
                            X
                        </button>
                    </div>
                }
                </For>
            </div>
            <form
                class="row"
                style="justify-content: space-around;"
                onSubmit={(e) => {
                    e.preventDefault();

                    let form = new FormData(e.currentTarget);
                    let text = form.get("input")?.toString();
                    e.currentTarget.reset();

                    if (text == null) {
                        throw "Bad input on task form data";
                    }

                    if (text.length === 0) {
                        return; // If empty do not throw but don't save it.
                    }

                    props.addTagCallback(text);
                }}
            >
                <div class="large form-with-title inline" style="height:41.19px;">
                    <p style="text-align:left; margin-right:30px;">Tag:</p>
                    <input
                        id="tag-input"
                        name="input"
                        placeholder="Enter a tag..."
                        style="width:100%;"
                    />
                </div>
                <div class="medium" />
                <button type="submit" style="height: fit-content; align-self:flex-end;">Add</button>
            </form>
        </div>
    );
};