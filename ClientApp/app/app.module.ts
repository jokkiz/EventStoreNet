import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ModelModule } from "./models/model.module";
// import { EventTableComponent } from "./structure/eventTable.component"
// import { FilterEventsComponent } from "./structure/filter.component";
// import { EventDetailComponent } from "./structure/eventDetail.component";
import { RoutingConfig } from "./app.routing";
import { StoreModule } from "./store/store.module";
import { EventSelectionComponent } from "./store/eventSelection.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpModule, ModelModule, RoutingConfig, StoreModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
