import {Injectable} from '@angular/core';
import {Repository} from './repository';
import {Cart} from './cart.model';
import {Router, NavigationStart} from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class Order {
    constructor(private repo: Repository, public cart: Cart, router: Router) {
        router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(event => {
                if (router.url.startsWith('/checkout') && this.name != null && this.address != null) {
                    repo.storeSessionData('checkout', {
                        nane: this.name, address: this.address, cardNumber: this.payment.cardNumber,
                        cardExpiry: this.payment.cardExpiry, cardSecurityCode: this.payment.cardSecurityCode
                    });
                }

            });
            
        repo.getSessionData('checkout').subscribe(data => {
            if (data != null) {
                this.name = data.name;
                this.address = data.address;
                this.payment.cardNumber = data.cardNumber;
                this.payment.cardExpiry = data.cardExpiry;
                this.payment.cardSecurityCode = data.cardSecurityCode;
            }
        });
    }

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
