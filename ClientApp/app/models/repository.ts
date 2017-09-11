import { Event } from "./event.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Filter } from "./configClasses.repository";

const eventsUrl = "/api/events";

@Injectable()
export class Repository {
    private filterObject = new Filter();

    constructor(private http: Http) {
       // this.filter.category = "Open Air";
        this.filter.related = true;
        this.filter.year = 2017;
        this.getEvents(true);
    }

    getEvent(id: number) {
        this.sendRequest(RequestMethod.Get, eventsUrl + "/" + id)
            .subscribe(response => { this.event = response.json(); });
    }

    private sendRequest(verb: RequestMethod, url: string, data?: any): Observable<any> {
        return this.http.request(new Request({
            method: verb, url: url, body: data
        })).map(response => response.json());
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

    get filter(): Filter {
        return this.filterObject;
    }
    event: Event;
    events: Event[];
}