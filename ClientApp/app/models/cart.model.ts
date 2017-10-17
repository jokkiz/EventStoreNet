import {Injectable} from '@angular/core';
import {Event} from '../models/event.model';
import {Repository} from './repository';

@Injectable()
export class Cart {
    selections: EventSelection[] = [];
    itemCount: number = 0;
    totalPrice: number = 0;

    constructor(private repo: Repository) {
        repo.getSessionData('cart').subscribe(cartData => {
            if (cartData != null) {
                cartData.map(item => new EventSelection(this, item.eventId, 
                    item.name, item.price, item.quantity)).forEach(item => this.selections.push(item));
                this.update();
            }
        });
    }

    update(storeData: boolean = true) {
        this.itemCount = this.selections.map(es => es.quantity)
            .reduce((prev, curr) => prev + curr, 0);
        this.totalPrice = this.selections.map(es => es.quantity * es.price)
            .reduce((prev, curr) => prev + curr, 0);
        if (storeData) {
            this.repo.storeSessionData('cart', this.selections.map(s => {
                return {eventID: s.eventId, name: s.name, price: s.price, quantity: s.quantity };
            }));
        }
    }
    addEvent(event: Event) {
        const selection = this.selections.find(ps => ps.eventId == event.eventId);
        if (selection) {
            selection.quantity++;
        } else {
            this.selections.push(new EventSelection(this,
                event.eventId, event.name, event.price, 1
            ));
            this.updateCart();
        }
    }

    updateQuantity(eventId: number, quantity: number) {
        if (quantity > 0) {
            let selection = this.selections.find(es => es.eventId == eventId);
            if (selection) {
                selection.quantity = quantity;
            } else {
                let index = this.selections.findIndex(es => es.eventId == eventId);
                if (index != -1) {
                    this.selections.splice(index, 1);
                }
                this.updateCart();
            }
        }
    }

    updateCart() {
        this.itemCount = this.selections.map(es => es.quantity).reduce((prev, curr) => prev + curr, 0);
        this.totalPrice = this.selections.map(ps => ps.price).reduce((prev, curr) => prev + curr, 0);
    }

    clear() {
        this.selections = [];
        this.updateCart();
    }
}

export class EventSelection {
    constructor(public cart: Cart,
        public eventId?: number,
        public name?: string,
        public price?: number,
        private quantityValue?: number
    ) { }

    get quantity() {
        return this.quantityValue;
    }

    set quantity(newQuantity: number) {
        this.quantityValue = newQuantity;
        this.cart.updateCart();
    }
}
