import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import TableConfigInterface from "../../shared/data-table/models/table-config.interface";
import {FormControl} from "@angular/forms";
import {DataTableService} from "../../shared/data-table/services/data-table.service";
import {FlightService} from "../services/flightService/flight.service";
import {debounceTime, takeUntil} from "rxjs/operators";
import {Flight} from "../../store/models/flight.model";
import {AppState} from "../../app.state";
import {Store} from "@ngrx/store";
import * as FlightActions from './../../store/actions/flight.action';
import {SnackbarComponent} from "../../shared/snackbar/snackbar.component";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$: Subject<boolean> = new Subject<boolean>();
  tableConfig: TableConfigInterface;
  @ViewChild('AirlineName', {static: true}) airlineName: TemplateRef<any>;
  @ViewChild('AirlineLogoAddress', {static: true}) airlineLogoAddress: TemplateRef<any>;
  allFlights = [];
  allFlightsForSearch = [];
  formatValue;
  isShowTableState = false;
  isLoading: boolean;
  public addButtonClick$ = new BehaviorSubject(false);
  SearchController = new FormControl();
  title = 'Welcome to flight';
  storeFlight: Observable<Flight[]>;

  // formatValue;
  constructor(private _dataTableService: DataTableService,
              private store: Store<AppState>,
              private _flightService: FlightService,
              private _snackbarService: SnackbarComponent) {
    // get flight data from store
    // this.storeFlight = store.select('flight');
  }

  ngOnInit() {
    this.subscribeToFormClick();
    this.setTableConfig();
    this.getTableData();
    this.getAllFlightsData();
    this.searchFlight().then(r => r);

  }

  setTableConfig(): void {
    this.tableConfig = {
      columns: [
        {
          title: 'AirlineLogoAddress',
          key: 'AirlineLogoAddress',
          cellTemplate: this.airlineLogoAddress,
        },
        {
          title: 'AirlineName',
          key: 'AirlineName',
          cellTemplate: this.airlineName,
        },
        {
          title: 'InboundFlightsDuration',
          key: 'InboundFlightsDuration'
        },
        {
          title: 'OutboundFlightsDuration',
          key: 'OutboundFlightsDuration',
        },
        {
          title: 'TotalAmount',
          key: 'TotalAmount',
        }
      ],
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        pageSizeOptions: [10, 20]
      }
    };
  }

  getTableData(): void {
    this._dataTableService.tableChangeEvent.subscribe(reloadEvent => {
      if (reloadEvent) {
        const pagination = {
          pageSize: reloadEvent ? reloadEvent.page.pageSize : 10,
          pageNumber: reloadEvent ? reloadEvent.page.pageNumber : 0
        };
        this.formatValue = this.allFlights?.slice(10 * pagination.pageNumber, (10 * pagination.pageNumber) + pagination.pageSize);
        this._dataTableService.setTableData({data: this.allFlights, totalCount: this.allFlights.length});
      }
      this._dataTableService.setTableData({data: this.formatValue, totalCount: this.allFlights.length});
    });
  }

  getAllFlightsData(): void {
    this.isLoading = true;
    this._flightService.getAll()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(response => {
        this.isLoading = false;
        // dispatch flight data
        // this.store.dispatch(new FlightActions.AddFlight(response) )
        this.allFlights = response;
        this.allFlightsForSearch = response;
        this.formatValue = this.allFlights.slice(0, 10);
        this._dataTableService.setTableData({data: this.formatValue, totalCount: this.allFlights.length});
      }, error => {
        this.isLoading = false;
      });
  }

  onAddFlightClick(): void {
    this.addButtonClick$.next(true);
  }

  subscribeToFormClick(): void {
    this.addButtonClick$.asObservable().subscribe(res => {
      this.isShowTableState = res;
    });
  }

  backToTableView(): void {
    this.addButtonClick$.next(false);
  }

  onSaveFlightData(data): void {
    // const body = {
    //   AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/MultiAirline.gif",
    //   AirlineName: data.ArrivalAirportCode + data.DepartureAirportCode,
    //   InboundFlightsDuration: '23:10',
    //   ItineraryId: Math.floor(Math.random() * 1),
    //   OutboundFlightsDuration: '28:22',
    //   Stops: 2,
    //   TotalAmount: '105:22'
    // }
    // this.formatValue.unshift(body);
    this.sendFlightRequest(data);
    this.addButtonClick$.next(false);

  }

  sendFlightRequest(data): void {
    this.isLoading = true;
    this._flightService.create(data)
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(res => {
        this.isLoading = false;
        // this.formatValue.unshift(res);
    }, error => {
        this.isLoading = false;
      this._snackbarService.openSnackBar(error.error.Message);
    });
  }

  async searchFlight(): Promise<void> {
    this.SearchController.valueChanges.pipe(debounceTime(1000))
      .subscribe((value: string) => {
        if (!value) {
          this._dataTableService.tableChangeEvent.next(
            {page: {pageNumber: 0, pageSize: 10}, sort: ''}
          );
          this.getAllFlightsData();
          return;
        }
        this.formatValue = this.allFlightsForSearch.filter(response => response.AirlineName.toLowerCase().match(value.toLowerCase()));
        this.allFlights = this.formatValue;
        const formatValue = this.formatValue.slice(0, 10);
        this._dataTableService.setTableData({data: formatValue, totalCount: this.formatValue.length});
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(true);
    this._unsubscribeAll$.complete();
  }


}
