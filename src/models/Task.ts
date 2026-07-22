import { Signal } from "solid-js";

export class Task {
    id: number = 0;
    text: string = "";
    completed: boolean;

    constructor(id: number, text: string, completed: boolean) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}