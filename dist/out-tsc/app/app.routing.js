"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
// import { EventTableComponent } from "./structure/eventTable.component";
// import { EventDetailComponent } from "./structure/eventDetail.component";
var eventSelection_component_1 = require("./store/eventSelection.component");
var cartDetail_component_1 = require("./store/cartDetail.component");
var routes = [
    { path: 'cart', component: cartDetail_component_1.CartDetailComponent },
    { path: 'store', component: eventSelection_component_1.EventSelectionComponent },
    { path: '', component: eventSelection_component_1.EventSelectionComponent }
];
exports.RoutingConfig = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map