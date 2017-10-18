﻿import {Routes, RouterModule} from '@angular/router';
import {EventSelectionComponent} from './store/eventSelection.component';
import {CartDetailComponent} from './store/cartDetail.component';
import {CheckoutDetailsComponent} from './store/checkout/checkoutDetails.component';
import {CheckoutPaymentComponent} from './store/checkout/checkoutPayment.component';
import {CheckoutSummaryComponent} from './store/checkout/checkoutSummary.component';
import {OrderConfirmationComponent} from './store/checkout/orderConfirmation.component';

const routes: Routes = [
    { path: 'checkout/step1', component: CheckoutDetailsComponent},
    { path: 'checkout/step2', component: CheckoutPaymentComponent},
    { path: 'checkout/step3', component: CheckoutSummaryComponent},
    { path: 'checkout/confirmation', component: OrderConfirmationComponent},
    { path: 'checkout', component: CheckoutDetailsComponent},
    { path: 'cart', component: CartDetailComponent},
    { path: 'store', component: EventSelectionComponent },
    { path: '', component: EventSelectionComponent }
];

export const RoutingConfig = RouterModule.forRoot(routes);
