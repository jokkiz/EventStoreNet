"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_model_1 = require("../models/event.model");
var RatingComponent = (function () {
    function RatingComponent() {
    }
    Object.defineProperty(RatingComponent.prototype, "stars", {
        get: function () {
            if (this.event != null && this.event.ratings != null) {
                var totalStars = this.event.ratings.map(function (r) { return r.stars; })
                    .reduce(function (prev, current) { return prev + current; }, 0);
                var countStars_1 = Math.round(totalStars / this.event.ratings.length);
                return Array(5).fill(false).map(function (value, index) {
                    return index < countStars_1;
                });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    return RatingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", event_model_1.Event)
], RatingComponent.prototype, "event", void 0);
RatingComponent = __decorate([
    core_1.Component({
        selector: "store-ratings",
        templateUrl: "ratings.component.html"
    })
], RatingComponent);
exports.RatingComponent = RatingComponent;
//# sourceMappingURL=ratings.component.js.map