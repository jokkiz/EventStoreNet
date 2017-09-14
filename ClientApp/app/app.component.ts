import { Component } from '@angular/core';
import { Repository } from './models/repository';
import { Event } from "./models/event.model";
import { Church } from "./models/church.model";

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

    createEvent() {
        this.repo.createEvent(
            new Event(0,
                "Open Air 2018",
                "Open Air",
                "Самое долгожданное событие Санкт-Петербурга и Ленинградской области в 2018 году",
                2000.00,
                this.repo.churchies[0].churchId != null ? this.repo.churchies[0].churchId : null,
                new Date(2018, 7, 5, 14, 0, 0),
                new Date(2018, 7, 8, 14, 0, 0)
            )
        );
    }

    createEventAndChurch() {        
        let c = new Church(0, "ц. Преображение", "Санкт-Петербург", "пр. Нарвский, 13Б", "Санкт-Петербург, пр. Нарвский, 13Б");

        let e = new Event(0,
            "Open Air 2019",
            "Open Air",
            "Самое долгожданное событие Санкт-Петербурга и Ленинградской области в 2019 году",
            2000.00,
            c,
            new Date(2019, 7, 5, 14, 0, 0),
            new Date(2019, 7, 8, 14, 0, 0)
        );
        this.repo.createEventAndChurch(e, c);
    }

    replaceEvent() {
        let e = this.repo.events[0];
        e.name = "Изменил название мероприятия";
        e.category = "Другая категория";
        this.repo.replaceEvent(e);
    }

    replaceChurch() {
        let c = new Church(3, "Новое название церкви", "Выборг", "Новый адрес", "Новое расположение");
        this.repo.replaceChurch(c);
    }
}
