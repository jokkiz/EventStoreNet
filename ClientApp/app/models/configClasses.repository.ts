export class Filter {
    category?: string;
    search?: string;
    related: boolean = false;
    year?: number;

    reset() {
        this.category = this.search = this.year = null;
        this.related = false;
    }
}

export class Pagination {
    eventPerPage: number = 4;
    currentPage = 1;
}