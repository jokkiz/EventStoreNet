import { Component } from '@angular/core';
import { Repository } from './models/repository';
import { Event } from "./models/event.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private repo: Repository) { }

    get event() {
        return this.repo.event;
    }

    get events(): Event[] {
        return this.repo.events;
    }
}
