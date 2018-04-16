'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eGridControl = (function () {
    function eGridControl() {
        //Grid configurations
        this.gridOptions = {};
        this.columnDefs = [];
        this.gridOptions = {
            rowData: null,
            enableColResize: true,
            suppressCellSelection: true,
            debug: false,
            rowHeight: 30,
            //rowSelection: 'single',
            //rowDeselection: true,
            //columnDefs: this.columnDefs,
            rowModelType: 'virtual',
            enableServerSideSorting: true,
            enableServerSideFilter: true
        };
    }
    eGridControl.prototype.ngOnInit = function () {
    };
    eGridControl.prototype.createColumnDefs = function (data) {
        var keyNames = Object.keys(data);
        var headers = [];
        headers.push({
            headerName: "",
            suppressMenu: true,
            suppressSorting: true,
            suppressResize: true,
            width: 66,
            template: "<div><button type=\"button\" data-action-type=\"view\" class=\"btn btn-default btn-white btn-xs\"><i class=\"fa fa-pencil\" data-action-type=\"view\"></i></button>\n                <button type=\"button\" data-action-type=\"remove\" class=\"btn btn-default btn-white btn-xs\"><i class=\"fa fa-trash\" data-action-type=\"remove\"></i></button></div>"
        });
        keyNames.map(function (key) {
            headers.push({
                headerName: key.replace(/_/gi, " ").toUpperCase(),
                field: key,
                suppressMenu: false,
                suppressSorting: false,
                suppressResize: false
            });
        });
        return headers;
    };
    //data gets mapped to the corresponding "field" key of the headers
    eGridControl.prototype.createRowData = function () {
        return [
            { name: "Geller", age: 30, gender: "Male" },
            { name: "Geller", age: 28, gender: "Female" },
            { name: "Tribbiani", age: 29, gender: "Male" },
            { name: "Bing", age: 30, gender: "Male" },
            { name: "Green", age: 28, gender: "Female" },
            { name: "Buffay", age: 29, gender: "Female" }
        ];
    };
    eGridControl.prototype.setRowData = function (allOfTheData) {
        var dataSource = {
            rowCount: null,
            pageSize: 100,
            overflowSize: 100,
            maxConcurrentRequests: 2,
            maxPagesInCache: 2,
            getRows: function (params) {
                //console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS.
                // To make the demo look real, wait for 500ms before returning
                setTimeout(function () {
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
    };
    eGridControl.prototype.ngOnDestroy = function () { };
    eGridControl.prototype.ngAfterViewInit = function () {
        var data = this.createRowData();
        this.gridOptions.api.setColumnDefs(this.createColumnDefs(data[0]));
        this.setRowData(data);
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
        /*this.connectionServer = this.injector.get('data');
         let dynamicCols = this.injector.get('dynamicCols');
         let DBCollections = this.injector.get('DBCollections');
         this.gridOptions.api.setColumnDefs(dynamicCols);
         this.setRowData(DBCollections);
         this.gridOptions.api.sizeColumnsToFit();
         this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));*/
    };
    eGridControl.prototype.createTable = function () {
        //this.openModal(new DBServerTableDescription(), DBETableDescriptionComponent, 'create');
    };
    eGridControl.prototype.refreshTable = function () {
        //this.callService(this.connectionServer);
    };
    /*callService(connectionServer: IDBConnectionServer){
     this._dbHomeService.getConnectionDBSchemas(connectionServer.id).subscribe(res=>{
     let respData = res['data'];
     if(res && res['success'] && respData){
     let _FirstRow = respData[0];
     let dynamicCols = [];
     dynamicCols.push({
     headerName: "",
     suppressMenu: true,
     suppressSorting: true,
     suppressResize:true,
     width:66,
     template:`<button type="button" data-action-type="view" class="btn btn-default btn-white btn-xs"><i class="fa fa-pencil" data-action-type="view"></i></button>
     <button type="button" data-action-type="remove" class="btn btn-default btn-white btn-xs"><i class="fa fa-trash" data-action-type="remove"></i></button>`
     });

     if(_FirstRow) {
     let keys = Object.keys(_FirstRow);
     keys.forEach(function (item, index) {
     dynamicCols.push({
     headerName: item.replace(/_/gi, " ").toUpperCase(), field: item,
     suppressMenu: true,
     suppressSorting: true
     });
     });
     }
     this.gridOptions.api.setColumnDefs(dynamicCols);
     this.setRowData(respData);
     this.gridOptions.api.sizeColumnsToFit();
     this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
     }
     }, err=>{});
     }*/
    /*openModal(dbTableServerDescription: IDBServerTableDescription, popupComponent, viewType){
     if(this.modalRef){
     this.modalRef.destroy();
     }
     let modal$ = this.modalPopupService.create(DBEPopupModule, popupComponent, {
     data:dbTableServerDescription,
     connectionServer : this.connectionServer,
     viewType:viewType,
     ok: (snacks) => {
     alert('hi! wirking on this functionality!');
     }
     });
     modal$.subscribe((ref) => {
     this.modalRef = ref;
     })
     }*/
    eGridControl.prototype.onActionViewClick = function (data, e) {
        //this.openModal(data, any, 'edit');
        console.log("View action clicked", data);
    };
    eGridControl.prototype.onActionRemoveClick = function (data, e) {
        //e.api.rowRenderer.renderedRows[e.rowIndex].destroy();
        console.log("Remove action clicked", data);
    };
    eGridControl.prototype.onRowClicked = function (e, i) {
        if (e.event.target !== undefined) {
            var data = e.data, self_1 = this;
            var actionType = e.event.target.getAttribute("data-action-type");
            if (actionType) {
                var _actionTypes = {
                    "view": { action: this.onActionViewClick },
                    "remove": { action: this.onActionRemoveClick }
                };
                _actionTypes[actionType].action(data, e);
            }
            return;
        }
    };
    eGridControl = __decorate([
        core_1.Component({
            selector: '[e-grid]',
            templateUrl: './e-grid.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], eGridControl);
    return eGridControl;
}());
exports.eGridControl = eGridControl;
//# sourceMappingURL=e-grid.js.map