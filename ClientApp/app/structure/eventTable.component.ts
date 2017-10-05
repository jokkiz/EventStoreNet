import { Component } from '@angular/core';
import { Repository } from '../models/repository';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event-table',
    templateUrl: 'eventTable.component.html'
})
export class EventTableComponent{
    constructor(private repo: Repository,
        private router: Router
    ) { }

    get events(): Event[]{
        return this.repo.events;
    }

    selectEvent(id: number) {
        this.repo.getEvent(id);
        this.router.navigateByUrl('/detail');
    }
}
