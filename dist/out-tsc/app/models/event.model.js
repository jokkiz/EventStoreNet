"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(eventId, name, category, description, price, church, datebegin, dateend, ratings) {
        this.eventId = eventId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.church = church;
        this.datebegin = datebegin;
        this.dateend = dateend;
        this.ratings = ratings;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.model.js.map