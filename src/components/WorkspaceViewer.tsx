import { Workspace } from "../models/bindings"

type WorkspaceViewerProps = {
    workspace: Workspace
}

export default function WorkspaceViewer(props: WorkspaceViewerProps) {
    return <p>{props.workspace?.id ?? "Null"}</p>
}