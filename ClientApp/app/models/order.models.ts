import {Injectable} from '@angular/core';
import {Repository} from './repository';
import {Cart} from './cart.model';

@Injectable()
export class Order {
    constructor(private repo: Repository, public cart: Cart) {}

    orderId: number;
    name: string;
    address: string;
    payment: Payment = new Payment();
    submitted: boolean = false;
    shipped: boolean = false;
    orderConfirmation: OrderConfirmation;

    get events(): CartLine[] {
        return this.cart.selections
            .map(e => new CartLine(e.eventId, e.quantity));
    }

    clear() {
        this.name = null;
        this.address = null;
        this.payment = new Payment();
        this.cart.clear();
        this.submitted = false;
    }

    submit() {
        this.submitted = true;
        this.repo.createOrder(this);
    }
}

export class OrderConfirmation {
    constructor(public orderId: number, public authCode: string, public amount: number) {}
}

export class Payment {
    cardNumber: string;
    cardExpiry: string;
    cardSecurityCode: string;
}

export class CartLine {
    constructor(private eventid: number, private quantity: number) {}

}