import {Injectable} from '@angular/core';
import {Event} from '../models/event.model';

@Injectable()
export class Cart {
    selections: EventSelection[] = [];
    totalPrice: number = 0;

    addEvent(event: Event) {
        const selection = this.selections.find(ps => ps.eventId == event.eventId);
        if (selection) {
            selection.isBuy = true;
        } else {
            this.selections.push(new EventSelection(this,
                event.eventId, event.name, event.price, true
            ));
            this.updateCart();
        }
    }

    updateCart() {
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
        private isBuyValue?: boolean
    ) {
        this.isBuyValue = false;
    }

    get isBuy() {
        return this.isBuyValue;
    }

    set isBuy (newBuy: boolean) {
        this.isBuyValue = newBuy;
        this.cart.updateCart();
    }
}
