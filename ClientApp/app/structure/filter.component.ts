import { Component } from "@angular/core";
import { Repository } from "../models/repository";

@Component({
    selector: "filter-events",
    templateUrl: "filter.component.html"
})
export class FilterEventsComponent {
    public openAirCategory = "Open Air";

    constructor(private repo: Repository) { }

    setCategory(category: string) {
        this.repo.filter.category = category;
        this.repo.getEvents();
    }

}