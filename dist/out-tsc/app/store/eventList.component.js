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
var repository_1 = require("../models/repository");
var cart_model_1 = require("../models/cart.model");
var EventListComponent = (function () {
    function EventListComponent(repo, cart) {
        this.repo = repo;
        this.cart = cart;
    }
    Object.defineProperty(EventListComponent.prototype, "events", {
        get: function () {
            if (this.repo.events != null && this.repo.events.length > 0) {
                var pageIndex = (this.repo.pagination.currentPage - 1) * this.repo.pagination.eventPerPage;
                return this.repo.events.slice(pageIndex, pageIndex + this.repo.pagination.eventPerPage);
            }
        },
        enumerable: true,
        configurable: true
    });
    EventListComponent.prototype.addToCart = function (event) {
        this.cart.addEvent(event);
    };
    return EventListComponent;
}());
EventListComponent = __decorate([
    core_1.Component({
        selector: 'app-store-event-list',
        templateUrl: 'eventList.component.html'
    }),
    __metadata("design:paramtypes", [repository_1.Repository, cart_model_1.Cart])
], EventListComponent);
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=eventList.component.js.map