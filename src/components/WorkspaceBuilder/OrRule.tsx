import { createSignal, onCleanup, onMount } from "solid-js";

export type RuleSet = {
    id: number,
    negate: boolean,
    op: string,
    value: string,
};

type OrRuleProps = {
    setRuleCallback: (getter: () => string) => void,
}

function RuleSetToString(rule: RuleSet) {
    if (rule.value == "")
    {
        return "INVALID RULE#541361"
    }
    return (rule.negate ? "not " : "") + rule.op + " " + rule.value;
}

export default function OrRule(props: OrRuleProps) {
    const [ruleset, setRuleset] = createSignal({ id: 1, negate: false, op: "has", value: "" })

    onMount(() => {
        props.setRuleCallback(() => RuleSetToString(ruleset()));
    })

    return <div class="row">
        <input
            type="checkbox"
            onClick={(e) => {
                let newRuleset = ruleset();
                newRuleset.negate = e.currentTarget.checked;
                setRuleset(newRuleset);
            }}
        />
        <select onChange={(e) => {
            let newRuleset = ruleset();
            newRuleset.op = e.currentTarget.value;
            setRuleset(newRuleset);
        }}>
            <option value="has">has</option>
            <option value="is">is</option>
            <option value="startsWith">starts with</option>
        </select>
        <input type="text"
            onInput={(e) => {
                let newRuleset: RuleSet = ruleset();
                newRuleset.value = e.target.value;
                setRuleset(newRuleset);
            }} />
    </div>
}