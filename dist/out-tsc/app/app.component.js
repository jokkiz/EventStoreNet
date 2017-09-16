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
var repository_1 = require("./models/repository");
var event_model_1 = require("./models/event.model");
var church_model_1 = require("./models/church.model");
var AppComponent = (function () {
    function AppComponent(repo) {
        this.repo = repo;
    }
    Object.defineProperty(AppComponent.prototype, "event", {
        get: function () {
            return this.repo.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "events", {
        get: function () {
            return this.repo.events;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.createEvent = function () {
        this.repo.createEvent(new event_model_1.Event(0, "Open Air 2018", "Open Air", "Самое долгожданное событие Санкт-Петербурга и Ленинградской области в 2018 году", 2000.00, this.repo.churchies[0].churchId != null ? this.repo.churchies[0].churchId : null, new Date(2018, 7, 5, 14, 0, 0), new Date(2018, 7, 8, 14, 0, 0)));
    };
    AppComponent.prototype.createEventAndChurch = function () {
        var c = new church_model_1.Church(0, "ц. Преображение", "Санкт-Петербург", "пр. Нарвский, 13Б", "Санкт-Петербург, пр. Нарвский, 13Б");
        var e = new event_model_1.Event(0, "Open Air 2019", "Open Air", "Самое долгожданное событие Санкт-Петербурга и Ленинградской области в 2019 году", 2000.00, c, new Date(2019, 7, 5, 14, 0, 0), new Date(2019, 7, 8, 14, 0, 0));
        this.repo.createEventAndChurch(e, c);
    };
    AppComponent.prototype.replaceEvent = function () {
        var e = this.repo.events[0];
        e.name = "Изменил название мероприятия";
        e.category = "Другая категория";
        this.repo.replaceEvent(e);
    };
    AppComponent.prototype.replaceChurch = function () {
        var c = new church_model_1.Church(3, "Новое название церкви", "Выборг", "Новый адрес", "Новое расположение");
        this.repo.replaceChurch(c);
    };
    AppComponent.prototype.updateEvent = function () {
        var changes = new Map();
        changes.set("name", "Open Air 2019");
        changes.set("church", null);
        this.repo.updateEvent(10, changes);
    };
    AppComponent.prototype.deleteEvent = function () {
        this.repo.deleteEvent(10);
    };
    AppComponent.prototype.deleteChurch = function () {
        this.repo.deleteChurch(4);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [repository_1.Repository])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map