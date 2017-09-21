import {Component} from '@angular/core';
import {Repository} from "../models/repository";
import {Event} from "../models/event.model";

@Component({
    selector: "event-table",
    templateUrl: "eventTable.component.html"
})
export class EventTableComponent{
    constructor(private repo: Repository) { }

    get events(): Event[]{
        return this.repo.events;
    }

    selectEvent(id: number) {
        this.repo.getEvent(id);
    }
}
