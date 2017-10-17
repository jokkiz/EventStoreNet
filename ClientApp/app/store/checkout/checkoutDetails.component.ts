import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../models/order.models';

@Component({
    templateUrl: 'checkoutDetails.component.html'
})
export class CheckoutDetailsComponent {
    constructor(private route: Router, public order: Order) {
        if (order.events.length != 0) {
            this.route.navigateByUrl('cart/');
        }
    }
}