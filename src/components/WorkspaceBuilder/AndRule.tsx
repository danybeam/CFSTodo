import { For, onMount } from "solid-js";
import OrRule from "./OrRule";
import { createStore } from "solid-js/store";

type ORStoreItems = {
    getter: () => string,
}

type AndRuleProps = {
    setRuleCallback: (getter: () => string) => void,
}

function RuleSetToString(childRules: ORStoreItems[]) {
    let childRulesStrings = childRules.map((v) => v.getter());
    let result = childRulesStrings.join(" or ");
    if (childRules.length > 1) {
        result = "(" + result + ")";
    }
    return result;
}

export default function AndRule(props: AndRuleProps) {

    const [rules, setRules] = createStore<ORStoreItems[]>([{ getter: () => "" }]);

    onMount(() => {
        props.setRuleCallback(() => RuleSetToString(rules));
    });

    return <div class="and-rule">
        <For each={rules}>{(_, i) =>
            <div class="row">
                <OrRule setRuleCallback={(getter: () => string) => {
                    setRules(
                        i(),
                        { getter }
                    )
                }} />
                <button onClick={() => {
                    let newRules = rules.filter((_, j) => i() !== j);
                    setRules([...newRules]);
                }}>remove</button>
            </div>
        }
        </For>
        <button onClick={() => setRules([...rules, { getter: () => "" }])}>add OR rule</button>
    </div>;
}