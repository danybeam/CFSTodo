import { For, Show } from "solid-js";

type TagContainerProps = {
    tags: string[],
    removeTagCallback?: (tag: string) => void
}

export default function TagContainer(props: TagContainerProps) {

    return <div class="framed tag-container">
        <p style="margin-right:5px;">Tags:</p>
        <For each={props.tags}>{
            (tag) => <div class="tag">
                <p>
                    {tag}
                </p>
                <Show when={props.removeTagCallback}>
                    <button class="fake-button" onclick={() => { props.removeTagCallback!(tag); }}>
                        X
                    </button>
                </Show>
            </div>
        }
        </For>
    </div>
}