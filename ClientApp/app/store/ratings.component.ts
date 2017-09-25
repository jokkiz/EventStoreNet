import { Component, Input } from "@angular/core";
import { Event } from "../models/event.model";

@Component({
    selector: "store-ratings",
    templateUrl: "ratings.component.html"
})
export class RatingComponent {
    @Input()
    event: Event;

    get stars(): boolean[] {
        if (this.event != null && this.event.ratings != null) {
            let totalStars = this.event.ratings.map(r => r.stars)
                .reduce((prev, current) => prev + current, 0);
            let countStars = Math.round(totalStars / this.event.ratings.length);
            return Array(5).fill(false).map((value, index) => {
                return index < countStars;
            });
        } else {
            return [];
        }
    }
}