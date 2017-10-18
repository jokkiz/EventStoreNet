import { Event } from './event.model';
import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Filter, Pagination } from './configClasses.repository';
import { Church } from './church.model';
import {Order} from './order.models';

const eventsUrl = '/api/events';
const churchUrl = '/api/churchies';
const orderUrl = '/api/orders';

@Injectable()
export class Repository {
    private filterObject = new Filter();
    private paginationObject = new Pagination();

    constructor(private http: Http) {
        this.filter.related = true;
        this.getEvents(true);
    }

    getEvent(id: number) {
        this.sendRequest(RequestMethod.Get, eventsUrl + '/' + id)
            .subscribe(response => { this.event = response; });
    }

    

    getEvents(related = false) {
        let urls = eventsUrl + '?related=' + this.filter.related;

        if (this.filter.category) {
            urls += '&category=' + this.filter.category;
        }

        if (this.filter.search) {
            urls += '&search=' + this.filter.search;
        }

        if (this.filter.year) {
            urls += '&year=' + this.filter.year;
        }

        urls += '&metadata=true';

        this.sendRequest(RequestMethod.Get, urls)
            .subscribe(response => {
                this.events = response.data;
                this.categories = response.categories;
                this.pagination.currentPage = 1;
            });
    }

    get pagination(): Pagination {
        return this.paginationObject;
    }

    getChurchies() {
        this.sendRequest(RequestMethod.Get, churchUrl).subscribe(response => this.churchies = response);
    }

    createEvent(evnt: Event) {
        let data = {
            name: evnt.name, category: evnt.category, description: evnt.description, price: evnt.price,
            datebegin: evnt.datebegin, dateend: evnt.dateend,
            church: evnt.church ? evnt.church.churchId : 0
        };

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
        });
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
        this.sendRequest(RequestMethod.Post, eventsUrl + '/' + evnt.eventId, data)
            .subscribe(response => this.getEvents());
    }

    replaceChurch(chrch: Church) {
        let data = {
            name: chrch.name, city: chrch.city, street: chrch.street, geodata: chrch.geodata
        };
        this.sendRequest(RequestMethod.Put, churchUrl + '/' + chrch.churchId, data)
            .subscribe(response => this.getEvents());
    }

    updateEvent(id: number, changes: Map<string, any>) {
        let patch = [];
        changes.forEach((value, key) => patch.push({ op: 'replace', path: key, value: value }));
        this.sendRequest(RequestMethod.Patch, eventsUrl + '/' + id, patch)
            .subscribe(response => this.getEvents());
    }

    deleteEvent(id: number) {
        this.sendRequest(RequestMethod.Delete, eventsUrl + '/' + id).subscribe(response => this.getEvents());
    }

    deleteChurch(id: number) {
        this.sendRequest(RequestMethod.Delete, churchUrl + '/' + id)
            .subscribe(response => {
                this.getEvents();
                this.getChurchies();
        });
    }
    storeSessionData(dataType: string, data: any) {
        return this.sendRequest(RequestMethod.Post, '/api/session/' + dataType, data)
            .subscribe(response => {});
    }

    getSessionData(dataType: string): Observable<any> {
        return this.sendRequest(RequestMethod.Get, 'api/session/' + dataType);
    }

    getOrders() {
        this.sendRequest(RequestMethod.Get, orderUrl).subscribe(data => this.orders = data);
    }

    createOrder(order: Order) {
        this.sendRequest(RequestMethod.Post, orderUrl, {
            name: order.name,
            address: order.address,
            payment: order.payment,
            events: order.events
        }).subscribe(data => {
            order.orderConfirmation = data;
            order.cart.clear();
            order.clear();
        });
    }

    shipOrder(order: Order) {
        this.sendRequest(RequestMethod.Post, orderUrl + '/' + order.orderId)
            .subscribe(r => this.getOrders());
    }

    private sendRequest(verb: RequestMethod, url: string, data?: any): Observable<any> {
        return this.http.request(new Request({
            method: verb, url: url, body: data
        })).map(response => {
            return response.headers.get("Content-Length") != "0" ? response.json() : null;
        });
    }

    event: Event;
    events: Event[];
    churchies: Church[] = [];
    categories: string[] = [];
    orders: Order[] = [];
}
