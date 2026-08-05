import { createSignal, For, onMount } from "solid-js";
import { Workspace } from "../../models/bindings";

import WorkspaceContext from "../context/WorkspaceList"
import AndRule from "./AndRule";
import { createStore } from "solid-js/store";

type ANDStoreItems = {
   getter: () => string,
}

type WorkspaceBuilderProps = {
   onSaveCallback: (id: number) => void
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
      icon_id: null,
      filter_query: "",
   });

   onMount(() => {
      setWorkspace({
         id: minMaxID(WorkspaceContext.workspaces),
         name: "",
         icon_id: null,
         filter_query: "",
      });
   });
   const [andRules, setAndRules] = createStore<ANDStoreItems[]>([])

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
               newWorkspace.filter_query = result;
               setWorkspace(newWorkspace);
               WorkspaceContext.addWorkspace(workspace());
               props.onSaveCallback(workspace().id);
            }}>
               Save
            </button>
            <button onClick={() => setAndRules([{ getter: () => "" }])}>
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
         <button onClick={() => {
            setAndRules([...andRules, { getter: () => "" }]);
         }}>
            Add AND rule
         </button>

      </div>
   );
}