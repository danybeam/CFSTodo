// SolidJS imports
import { createSignal, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";

// General App imports
import { Workspace } from "../../models/bindings";

// App Context imports
import WorkspaceContext from "../context/WorkspaceList";

// Component imports
import AndRule from "./AndRule";

// Props type definiton
type WorkspaceBuilderProps = {
   onSaveCallback: () => void
}

// Type definition to extract values of rules at any moment
type ANDStoreItems = {
   getter: () => string,
}

function minMaxID(currentWorkspaces: Workspace[]) {
   if (currentWorkspaces?.length == 0) {
      return 0;
   }

   let candidate = 0;
   let sortedWorkspaces = [...currentWorkspaces].sort((l, r) => l.id - r.id);
   let currentElement = 0;
   let currentWS = sortedWorkspaces[currentElement++];
   while (currentWS && candidate >= currentWS.id) {
      candidate = currentWS.id + 1;
      currentWS = sortedWorkspaces[currentElement++];
   }

   return candidate;
}

export default function WorkspaceBuilder(props: WorkspaceBuilderProps) {

   const [workspace, setWorkspace] = createSignal<Workspace>({
      id: WorkspaceContext.workspaces[WorkspaceContext.workspaces.length - 1]?.id ?? -1 + 1,
      name: "",
      iconId: null,
      filterQuery: "",
   });


   // TODO_ is this still needed?
   onMount(() => {
      setWorkspace({
         id: minMaxID(WorkspaceContext.workspaces),
         name: "",
         iconId: null,
         filterQuery: "",
      });
   });

   // TODO_#001 This is "necessary" because I haven't figured out how to traverse the children and get their current state.
   // Call down signal up. How else can I signal up the state?
   // Keep state all the time?
   const [andRules, setAndRules] = createStore<ANDStoreItems[]>([])

   // TODO_ Extract save lambda function to external function
   return (
      <div class="workspace-builder">
         <div class="spaced row">
            <input
               id="name-input"
               name="input"
               placeholder="Enter the name for the workspace"
               style="width:50vw"
               onInput={(e) => {
                  let newWorkspace: Workspace = workspace();
                  newWorkspace.name = e.target.value;
                  setWorkspace(newWorkspace);
               }}
            />
            <button style="width: fit-content;" onClick={() => {
               if (workspace().name == "") {
                  alert("Please name your workspace before saving.");
                  return;
               }

               if (andRules.length == 0) {
                  alert("Please add any rules before continuing")
                  return;
               }

               let result = andRules.map((v) => v.getter()).join(" and ");

               if (result.includes("#541361")) {
                  alert("Please check your rules.\nSomething might not have been set.");
                  return;
               }

               let newWorkspace = workspace();
               newWorkspace.filterQuery = result;
               setWorkspace(newWorkspace);
               WorkspaceContext.addWorkspace(workspace());
               props.onSaveCallback();
            }}>
               Save
            </button>
            <button onClick={() => setAndRules([])}>
               Clear
            </button>
         </div>
         <For each={andRules}>{(_, i) =>
            <>
               <AndRule setRuleCallback={(getter: () => string) => {
                  setAndRules(
                     i(),
                     { getter }
                  );
               }} />
               <div class="separator" />
            </>
         }
         </For>
            {
               // empty getter needed on reset to create a new rule to be filled
            }
         <button onClick={() => {
            setAndRules([...andRules, { getter: () => "" }]);
         }}>
            Add AND rule
         </button>

      </div>
   );
}