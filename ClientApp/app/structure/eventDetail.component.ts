import {Component} from "@angular/core";
import {Repository} from "../models/repository";
import { Event } from "../models/event.model"; 
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "<event-detail>",
    templateUrl: "eventDetail.component.html"
})
export class EventDetailComponent {
    constructor(private repo: Repository, router: Router, activeRouter: ActivatedRoute) {
        let id = Number.parseInt(activeRouter.snapshot.params["id"]);
        if (id) {
            this.repo.getEvent(id);
        }
        else {
            router.navigateByUrl("/");
        }
    }

    get event(): Event {
        return this.repo.event;
    }
}