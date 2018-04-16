import { Input, NgModule, Component, ViewEncapsulation, ElementRef, EventEmitter} from '@angular/core';
import {ComponentUtil} from "./components/componentUtil";
import {GridOptions} from "./entities/gridOptions";
import {GridApi} from "./gridApi";
import {ColumnApi} from "./columnController/columnController";
import {Grid} from "./grid";

@Component({
  selector: 'enricher-grid',
  outputs: ComponentUtil.EVENTS,
  inputs: ComponentUtil.ALL_PROPERTIES.concat(['gridOptions']),
  template: '',
  styleUrls: ['./e.grid.css'],
  // tell angular we don't want view encapsulation, we don't want a shadow root
  encapsulation: ViewEncapsulation.None
})
export class EGrid {
  // not intended for user to interact with. so putting _ in so if user gets reference
  // to this object, they kind'a know it's not part of the agreed interface
  private _initialised = false;
  private _destroyed = false;

  @Input() gridOptions: GridOptions;

  // making these public, so they are accessible to people using the ng2 component references
  public api: GridApi;
  public columnApi: ColumnApi;

  constructor(private elementDef: ElementRef) {
    // create all the events generically. this is done generically so that
    // if the list of grid events change, we don't need to change this code.
    ComponentUtil.EVENTS.forEach( (eventName) => {
      (<any>this)[eventName] = new EventEmitter();
    });
  }

  // this gets called after the directive is initialised
  public ngOnInit(): void {
    this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.gridOptions, this);
    var nativeElement = this.elementDef.nativeElement;
    var globalEventLister = this.globalEventListener.bind(this);
    new Grid(nativeElement, this.gridOptions, globalEventLister);
    this.api = this.gridOptions.api;
    this.columnApi = this.gridOptions.columnApi;

    this._initialised = true;
  }

  updateGridData(httpResponse : any) {
    this.setRowData(httpResponse);
  }
  setRowData(allOfTheData : any) {
    let dataSource : any = {
      rowCount: null, // behave as infinite scroll
      pageSize: 100,
      overflowSize: 100,
      maxConcurrentRequests: 2,
      maxPagesInCache: 2,
      getRows: function (params : any) {
        //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        // At this point in your code, you would call the server, using $http if in AngularJS.
        // To make the demo look real, wait for 500ms before returning
        setTimeout( function() {
          // take a slice of the total rows
          var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
          // if on or after the last page, work out the last row.
          var lastRow = -1;
          if (allOfTheData.length <= params.endRow) {
            lastRow = allOfTheData.length;
          }
          // call the success callback
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
    //this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
  }
  public ngOnChanges(changes: any): void {
    if (this._initialised) {
      ComponentUtil.processOnChange(changes, this.gridOptions, this.api);
    }
  }

  public ngOnDestroy(): void {
    if (this._initialised) {
      // need to do this before the destroy, so we know not to emit any events
      // while tearing down the grid.
      this._destroyed = true;
      this.api.destroy();
    }
  }

  private globalEventListener(eventType: string, event: any): void {
    // if we are tearing down, don't emit angular 2 events, as this causes
    // problems with the angular 2 router
    if (this._destroyed) { return; }
    // generically look up the eventType
    var emitter = <EventEmitter<any>> (<any>this)[eventType];
    if (emitter) {
      emitter.emit(event);
    } else {
      console.log('ag-Grid-ng2: could not find EventEmitter: ' + eventType);
    }
  }
}

@NgModule({
  declarations: [EGrid],
  imports: [],
  exports: [EGrid]
})
export class EGridModule {
  constructor() {
    console.log('called EGridModule');
  }
}
