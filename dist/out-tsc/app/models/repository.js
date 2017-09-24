"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var configClasses_repository_1 = require("./configClasses.repository");
var eventsUrl = "/api/events";
var churchUrl = "/api/churchies";
var Repository = (function () {
    function Repository(http) {
        this.http = http;
        this.filterObject = new configClasses_repository_1.Filter();
        this.churchies = [];
        this.categories = [];
        this.filter.related = true;
        this.getEvents(true);
    }
    Repository.prototype.getEvent = function (id) {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Get, eventsUrl + "/" + id)
            .subscribe(function (response) { _this.event = response; });
    };
    Repository.prototype.sendRequest = function (verb, url, data) {
        return this.http.request(new http_1.Request({
            method: verb, url: url, body: data
        })).map(function (response) {
            return response.headers.get("Content-Length") != "0" ? response.json() : null;
        });
    };
    Repository.prototype.getEvents = function (related) {
        var _this = this;
        if (related === void 0) { related = false; }
        var urls = eventsUrl + "?related=" + this.filter.related;
        if (this.filter.category) {
            urls += "&category=" + this.filter.category;
        }
        if (this.filter.search) {
            urls += "&search=" + this.filter.search;
        }
        if (this.filter.year) {
            urls += "&year=" + this.filter.year;
        }
        urls += "&metadata=true";
        this.sendRequest(http_1.RequestMethod.Get, urls)
            .subscribe(function (response) {
            _this.events = response.data;
            _this.categories = response.categories;
        });
    };
    Repository.prototype.getChurchies = function () {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Get, churchUrl).subscribe(function (response) { return _this.churchies = response; });
    };
    Repository.prototype.createEvent = function (evnt) {
        var _this = this;
        var data = {
            name: evnt.name, category: evnt.category, description: evnt.description, price: evnt.price,
            datebegin: evnt.datebegin, dateend: evnt.dateend,
            church: evnt.church ? evnt.church.churchId : 0
        };
        this.sendRequest(http_1.RequestMethod.Post, eventsUrl, data).subscribe(function (response) {
            evnt.eventId = response;
            _this.events.push(evnt);
        });
    };
    Repository.prototype.createEventAndChurch = function (evnt, chrch) {
        var _this = this;
        var data = {
            name: chrch.name, city: chrch.city, street: chrch.street, geodata: chrch.geodata
        };
        this.sendRequest(http_1.RequestMethod.Post, churchUrl, data).subscribe(function (response) {
            chrch.churchId = response;
            evnt.church = chrch;
            _this.churchies.push(chrch);
            if (evnt != null) {
                _this.createEvent(evnt);
            }
        });
    };
    Object.defineProperty(Repository.prototype, "filter", {
        get: function () {
            return this.filterObject;
        },
        enumerable: true,
        configurable: true
    });
    /// Изменение события
    Repository.prototype.replaceEvent = function (evnt) {
        var _this = this;
        var data = {
            name: evnt.name, category: evnt.category, description: evnt.description, price: evnt.price,
            datebegin: evnt.datebegin, dateend: evnt.dateend,
            church: evnt.church ? evnt.church.churchId : 0
        };
        this.sendRequest(http_1.RequestMethod.Post, eventsUrl + "/" + evnt.eventId, data)
            .subscribe(function (response) { return _this.getEvents(); });
    };
    Repository.prototype.replaceChurch = function (chrch) {
        var _this = this;
        var data = {
            name: chrch.name, city: chrch.city, street: chrch.street, geodata: chrch.geodata
        };
        this.sendRequest(http_1.RequestMethod.Put, churchUrl + "/" + chrch.churchId, data)
            .subscribe(function (response) { return _this.getEvents(); });
    };
    Repository.prototype.updateEvent = function (id, changes) {
        var _this = this;
        var patch = [];
        changes.forEach(function (value, key) { return patch.push({ op: "replace", path: key, value: value }); });
        this.sendRequest(http_1.RequestMethod.Patch, eventsUrl + "/" + id, patch)
            .subscribe(function (response) { return _this.getEvents(); });
    };
    Repository.prototype.deleteEvent = function (id) {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Delete, eventsUrl + "/" + id).subscribe(function (response) { return _this.getEvents(); });
    };
    Repository.prototype.deleteChurch = function (id) {
        var _this = this;
        this.sendRequest(http_1.RequestMethod.Delete, churchUrl + "/" + id)
            .subscribe(function (response) {
            _this.getEvents();
            _this.getChurchies();
        });
    };
    return Repository;
}());
Repository = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map