import { Routes, RouterModule } from '@angular/router';
// import { EventTableComponent } from "./structure/eventTable.component";
// import { EventDetailComponent } from "./structure/eventDetail.component";
import { EventSelectionComponent } from './store/eventSelection.component';
import {CartDetailComponent} from './store/cartDetail.component';

const routes: Routes = [
    { path: 'cart', component: CartDetailComponent},
    { path: 'store', component: EventSelectionComponent },
    { path: '', component: EventSelectionComponent }
]

export const RoutingConfig = RouterModule.forRoot(routes);
