import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Event } from "../models/event.model";

@Component({
    selector: "store-event-list",
    templateUrl: "eventList.component.html"
})
export class EventListComponent {
    constructor(private repo: Repository) { }

    get events(): Event[] {
        return this.repo.events;
    }
}