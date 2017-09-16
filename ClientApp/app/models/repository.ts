import { Event } from "./event.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Filter } from "./configClasses.repository";
import { Church } from "./church.model";

const eventsUrl = "/api/events";
const churchUrl = "/api/churchies";

@Injectable()
export class Repository {
    private filterObject = new Filter();

    constructor(private http: Http) {
       // this.filter.category = "Open Air";
        this.filter.related = true;
       // this.filter.year = 2017;
        this.getEvents(true);
    }

    getEvent(id: number) {
        this.sendRequest(RequestMethod.Get, eventsUrl + "/" + id)
            .subscribe(response => { this.event = response.json(); });
    }

    private sendRequest(verb: RequestMethod, url: string, data?: any): Observable<any> {
        return this.http.request(new Request({
            method: verb, url: url, body: data
        })).map(response => {
            return response.headers.get("Content-Length") != "0" ? response.json() : null;
        });
    } 

    getEvents(related = false) {
        let urls = eventsUrl + "?related=" + this.filter.related;

        if (this.filter.category) {
            urls += "&category=" + this.filter.category; 
        }

        if (this.filter.search) {
            urls += "&search=" + this.filter.search;
        }

        if (this.filter.year) {
            urls += "&year=" + this.filter.year;
        }

        this.sendRequest(RequestMethod.Get, urls)
            .subscribe(response => this.events = response);
    }

    getChurchies() {
        this.sendRequest(RequestMethod.Get, churchUrl).subscribe(response => this.churchies = response);
    }

    createEvent(evnt: Event) {
        let data = {
            name: evnt.name, category: evnt.category, description: evnt.description, price: evnt.price,
            datebegin: evnt.datebegin, dateend: evnt.dateend,
            church: evnt.church ? evnt.church.churchId : 0
        }
        this.sendRequest(RequestMethod.Post, eventsUrl, data).subscribe(response => {
            evnt.eventId = response;
            this.events.push(evnt);
        });
    }

    createEventAndChurch(evnt: Event, chrch: Church) {
        let data = {
            name: chrch.name, city: chrch.city, street: chrch.street, geodata: chrch.geodata
        };
        this.sendRequest(RequestMethod.Post, churchUrl, data).subscribe(response => {
            chrch.churchId = response;
            evnt.church = chrch;
            this.churchies.push(chrch);
            if (evnt != null) {
                this.createEvent(evnt);
            }            
        })
    }
    get filter(): Filter {
        return this.filterObject;
    }

    /// Изменение события
    replaceEvent(evnt: Event) {
        let data = {
            name: evnt.name, category: evnt.category, description: evnt.description, price: evnt.price,
            datebegin: evnt.datebegin, dateend: evnt.dateend,
            church: evnt.church ? evnt.church.churchId : 0
        };
        this.sendRequest(RequestMethod.Post, eventsUrl + "/" + evnt.eventId, data)
            .subscribe(response => this.getEvents());
    }

    replaceChurch(chrch: Church) {
        let data = {
            name: chrch.name, city: chrch.city, street: chrch.street, geodata: chrch.geodata
        };
        this.sendRequest(RequestMethod.Put, churchUrl + "/" + chrch.churchId, data)
            .subscribe(response => this.getEvents());
    }

    updateEvent(id: number, changes: Map<string, any>) {
        let patch = [];
        changes.forEach((value, key) => patch.push({ op: "replace", path: key, value: value }));
        this.sendRequest(RequestMethod.Patch, eventsUrl + "/" + id, patch)
            .subscribe(response => this.getEvents());
    }

    deleteEvent(id: number) {
        this.sendRequest(RequestMethod.Delete, eventsUrl + "/" + id).subscribe(response => this.getEvents());
    }

    deleteChurch(id: number) {
        this.sendRequest(RequestMethod.Delete, churchUrl + "/" + id)
            .subscribe(response => {
                this.getEvents();
                this.getChurchies();
        });
    }

    event: Event;
    events: Event[];
    churchies: Church[] = [];
}