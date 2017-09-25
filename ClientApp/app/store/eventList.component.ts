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
        if (this.repo.events != null && this.repo.events.length > 0) {
            let pageIndex = (this.repo.pagination.currentPage - 1) * this.repo.pagination.eventPerPage;
            return this.repo.events.slice(pageIndex, pageIndex + this.repo.pagination.eventPerPage);
        }
    }
}