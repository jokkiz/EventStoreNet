import {Component} from "@angular/core";
import {Repository} from "../models/repository";
import {Event} from "../models/event.model"; 

@Component({
    selector: "<event-detail>",
    templateUrl: "eventDetail.component.html"
})
export class EventDetailComponent {
    constructor(private repo: Repository) { }

    get event(): Event {
        return this.repo.event;
    }
}