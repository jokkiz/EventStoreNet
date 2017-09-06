import { Event } from "./event.model";

export class Repository {
    constructor() {
        this.event = JSON.parse(document.getElementById("data").textContent);
    }

    event: Event
}