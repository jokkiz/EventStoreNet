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
var repository_1 = require("./repository");
var cart_model_1 = require("./cart.model");
var Order = (function () {
    function Order(repo, cart) {
        this.repo = repo;
        this.cart = cart;
        this.payment = new Payment();
        this.submitted = false;
        this.shipped = false;
    }
    Object.defineProperty(Order.prototype, "events", {
        get: function () {
            return this.cart.selections
                .map(function (e) { return new CartLine(e.eventId, e.quantity); });
        },
        enumerable: true,
        configurable: true
    });
    Order.prototype.clear = function () {
        this.name = null;
        this.address = null;
        this.payment = new Payment();
        this.cart.clear();
        this.submitted = false;
    };
    Order.prototype.submit = function () {
        this.submitted = true;
        this.repo.createOrder(this);
    };
    return Order;
}());
Order = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [repository_1.Repository, cart_model_1.Cart])
], Order);
exports.Order = Order;
var OrderConfirmation = (function () {
    function OrderConfirmation(orderId, authCode, amount) {
        this.orderId = orderId;
        this.authCode = authCode;
        this.amount = amount;
    }
    return OrderConfirmation;
}());
exports.OrderConfirmation = OrderConfirmation;
var Payment = (function () {
    function Payment() {
    }
    return Payment;
}());
exports.Payment = Payment;
var CartLine = (function () {
    function CartLine(eventid, quantity) {
        this.eventid = eventid;
        this.quantity = quantity;
    }
    return CartLine;
}());
exports.CartLine = CartLine;
//# sourceMappingURL=order.models.js.map