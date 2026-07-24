export type Task = {
    id: number;
    text: string;
    completed: boolean;
    isSuspended: boolean;
    vruntime: number;
    priority: number;
}