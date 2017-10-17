"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var cartSummary_component_1 = require("./cartSummary.component");
var filter_component_1 = require("./filter.component");
var pagination_component_1 = require("./pagination.component");
var eventList_component_1 = require("./eventList.component");
var ratings_component_1 = require("./ratings.component");
var eventSelection_component_1 = require("./eventSelection.component");
var cartDetail_component_1 = require("./cartDetail.component");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var StoreModule = (function () {
    function StoreModule() {
    }
    return StoreModule;
}());
StoreModule = __decorate([
    core_1.NgModule({
        declarations: [cartSummary_component_1.CartSummaryComponent, filter_component_1.FilterComponent, pagination_component_1.PaginationComponent, ratings_component_1.RatingComponent,
            eventList_component_1.EventListComponent, eventSelection_component_1.EventSelectionComponent, cartDetail_component_1.CartDetailComponent],
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule, forms_1.FormsModule],
        exports: [eventSelection_component_1.EventSelectionComponent]
    })
], StoreModule);
exports.StoreModule = StoreModule;
//# sourceMappingURL=store.module.js.map