import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private _onTableDataChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  tableChangeEvent: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private _page: any;
  private _sort: any;

  constructor() {}

  setTableData({data, totalCount}): void {
    this._onTableDataChange.next({data, totalCount});
  }

  get tableData(): Observable<any> {
    return this._onTableDataChange as Observable<any>;
  }

  onPageChange($event: PageEvent): void {
    this._page = {pageNumber: $event.pageIndex, pageSize: $event.pageSize};
    this.tableChangeEvent.next({page: this._page, sort: this._sort});
  }

  onSortChange($event: Sort): void {
    this._sort = $event;
    this.tableChangeEvent.next({page: this._page, sort: this._sort});
  }
}
