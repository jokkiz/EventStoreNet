import { Church } from "./church.model";
import { Rating } from "./rating.model";

export class Event {
    constructor(
        public eventId?: number,
        public name?: string,
        public category?: string,
        public description?: string,
        public price?: number,
        public church?: Church,
        public DateBegin?: Date,
        public DateEnd?: Date,
        public ratings?: Rating[]) { }
}