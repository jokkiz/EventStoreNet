import { Event } from "./event.model"
export class Rating {
    constructor(
        public ratingId?: number,
        public stars?: number,
        public event?: Event) { }
}