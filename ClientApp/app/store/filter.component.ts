import {Component} from "@angular/core";
import {Repository} from '../models/repository';

@Component({
    selector: "store-filter",
    templateUrl: "filter.component.html"
})
export class FilterComponent {
    constructor(private repo: Repository){ }

    get categories(): string[] {
        return this.repo.categories;
    }

    get currentCategory(): string {
        return this.repo.filter.category;
    }

    setCurrentCategory(newCategory: string) {
        this.repo.filter.category = newCategory;
        this.repo.getEvents();
    }
}