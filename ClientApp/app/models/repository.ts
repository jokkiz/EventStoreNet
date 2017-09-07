import { Event } from "./event.model";
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

const eventsUrl = "/api/events";

@Injectable()
export class Repository {

    constructor(private http: Http) {
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
        this.sendRequest(RequestMethod.Get, eventsUrl + "?related=" + related)
            .subscribe(response => this.events = response);
    }

    event: Event;
    events: Event[];
}