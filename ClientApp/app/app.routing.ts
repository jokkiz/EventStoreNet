import { Routes, RouterModule } from "@angular/router";
// import { EventTableComponent } from "./structure/eventTable.component";
// import { EventDetailComponent } from "./structure/eventDetail.component";
import { EventSelectionComponent } from "./store/eventSelection.component";
                 
const routes: Routes = [
    { path: "store", component: EventSelectionComponent },
    { path: "", component: EventSelectionComponent }
]

export const RoutingConfig = RouterModule.forRoot(routes);