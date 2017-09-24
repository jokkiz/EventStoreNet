import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { OrderSummaryComponent } from "./orderSummary.component";
import { FilterComponent } from "./filter.component";
import { PaginationComponent } from "./pagination.component";
import { EventListComponent } from "./eventList.component";
import { RatingComponent } from "./ratings.component";
import { EventSelectionComponent } from "./eventSelection.component";

@NgModule({
    declarations: [OrderSummaryComponent, FilterComponent, PaginationComponent, RatingComponent, EventListComponent, EventSelectionComponent],
    imports: [BrowserModule],
    exports: [EventSelectionComponent]
})
export class StoreModule { }