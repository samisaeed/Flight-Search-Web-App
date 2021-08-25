import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataTableService} from "./services/data-table.service";
import {Subject} from "rxjs";
import TableConfigInterface from "./models/table-config.interface";
import {takeUntil} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit , OnDestroy {
  dataSource: any;
  displayedColumns: string[];
  totalCount: 0;

  @Input() tableConfig: TableConfigInterface;

  private _unsubscribeAll$: Subject<boolean> = new Subject<boolean>();

  constructor(private _dataTableService: DataTableService) {}

  ngOnInit(): void {
    this.displayedColumns = this.tableConfig.columns.map(config => config.key);
    this.getTableData();
  }

  getTableData(): void {
    this._dataTableService.tableData
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(res => {
        this.dataSource = res.data;
        this.totalCount = res.totalCount;
      });
  }

  onPageChange($event: PageEvent): void {
    this._dataTableService.onPageChange($event);
  }

  sortData($event: Sort): void {
    this._dataTableService.onSortChange($event);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(true);
    this._unsubscribeAll$.complete();
  }

}
