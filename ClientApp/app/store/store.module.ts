import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CartSummaryComponent } from './cartSummary.component';
import { FilterComponent } from './filter.component';
import { PaginationComponent } from './pagination.component';
import { EventListComponent } from './eventList.component';
import { RatingComponent } from './ratings.component';
import { EventSelectionComponent } from './eventSelection.component';
import {CartDetailComponent} from './cartDetail.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [CartSummaryComponent, FilterComponent, PaginationComponent, RatingComponent,
        EventListComponent, EventSelectionComponent, CartDetailComponent],
    imports: [BrowserModule, RouterModule, FormsModule],
    exports: [EventSelectionComponent]
})
export class StoreModule { }