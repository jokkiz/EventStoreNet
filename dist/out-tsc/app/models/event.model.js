"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(eventId, name, category, description, price, church, DateBegin, DateEnd, ratings) {
        this.eventId = eventId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.church = church;
        this.DateBegin = DateBegin;
        this.DateEnd = DateEnd;
        this.ratings = ratings;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.model.js.map