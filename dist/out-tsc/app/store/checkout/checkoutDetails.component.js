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
var router_1 = require("@angular/router");
var order_models_1 = require("../../models/order.models");
var CheckoutDetailsComponent = (function () {
    function CheckoutDetailsComponent(route, order) {
        this.route = route;
        this.order = order;
        if (order.events.length != 0) {
            this.route.navigateByUrl('cart/');
        }
    }
    return CheckoutDetailsComponent;
}());
CheckoutDetailsComponent = __decorate([
    core_1.Component({
        templateUrl: 'checkoutDetails.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, order_models_1.Order])
], CheckoutDetailsComponent);
exports.CheckoutDetailsComponent = CheckoutDetailsComponent;
//# sourceMappingURL=checkoutDetails.component.js.map