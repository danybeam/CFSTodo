// SolidJS imports
import { createSignal, onMount } from "solid-js";

// Definiton for rule information
export type RuleSet = {
    id: number,
    any: boolean,
    negate: boolean,
    op: string,
    value: string,
};

// Definiton for rule getter
type OrRuleProps = {
    setRuleCallback: (getter: () => string) => void,
}

function RuleSetToString(rule: RuleSet) {
    if (rule.value == "") {
        return "INVALID RULE#541361"
    }
    let result = "(" + (rule.negate ? "not " : "") + rule.op + " " + rule.value + ")";
    result = (rule.any ? "any" : "all") + result;
    return result;
}

// TODO_ Related to TODO_#001 maybe I can update the rule every time it changes and signal it to the parent?
export default function OrRule(props: OrRuleProps) {
    const [ruleset, setRuleset] = createSignal({ id: 1, any: true, negate: false, op: "has", value: "" })

    onMount(() => {
        props.setRuleCallback(() => RuleSetToString(ruleset()));
    })

    return <div class="row spaced">
        <select onChange={(e) => {
            let newRuleset = ruleset();
            newRuleset.any = e.currentTarget.value == "any";
            setRuleset(newRuleset);
        }}>
            <option value="any">any tag</option>
            <option value="all">all tags</option>
        </select>
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
        <div class="row">
            <input
                type="checkbox"
                onClick={(e) => {
                    let newRuleset = ruleset();
                    newRuleset.negate = e.currentTarget.checked;
                    setRuleset(newRuleset);
                }}
            />
            <p>negate</p>
        </div>
    </div>
}