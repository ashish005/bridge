'use strict';
import { Component, Input, Renderer, ViewChildren, QueryList, OnInit, OnDestroy, OnChanges, ElementRef, AfterViewInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import {ModalPopupService, ModalPopup} from '../../../util/modal-popup.service';

@Component({ templateUrl: './pop-up/dbe-column-view.html' })
@ModalPopup()
export class EGridTableDescriptionComponent implements OnInit{
    ok: Function; destroy: Function; closeModal: Function;
    data: any;
    connectionServer: any;
    tableDesc: Array<any> = [];
    viewType:string='';
    dbColumnTypeOptions: any;
    constructor(){}

    ngOnInit(){
        this.tableDesc = [];

    }

    getKeys() : Array<string> {
        return Object.keys(this.data);
    }

    onCancel(): void {
        this.closeModal();
        this.destroy();
    }
    onOk(type: any): void{
        this.closeModal();
        this.destroy();
        this.ok(null);
    }

    addColumnInfo(){
    }
}

@Component({ templateUrl: './pop-up/dbe-dyncontrol-view.html' })
@ModalPopup()
export class EGridDynamicEditPopupComponent implements OnInit{
    ok: Function; destroy: Function; closeModal: Function;
    data: any;
    schemas: Array<any>;
    connectionServer: any;
    tableDesc: any;
    viewType:string= '';
    constructor(){}

    ngOnInit(){
    }

    getKeys() : Array<string> {
        return Object.keys(this.data);
    }

    onCancel(): void{
        this.closeModal();
        this.destroy();
    }
    onOk(): void{
        this.closeModal();
        this.destroy();
        this.ok(null);
    }
}

@Component({
    selector: '[e-grid]',
    templateUrl: './e-grid.html',
    encapsulation: ViewEncapsulation.None
})
export class eGridControl implements OnInit, OnDestroy, AfterViewInit {
    //Grid configurations
    gridOptions:any = {};
    columnDefs:Array<any> = [];
    @Input() eOptions:any;
    @Input() isCreatorView: boolean = false;
    schemas: any = [];

    constructor(private modalPopupService: ModalPopupService){//private enricherService:EnricherService,
        this.gridOptions = {
            rowData: null,
            enableColResize: true,
            suppressCellSelection:true,
            debug: false,
            rowHeight:30,
            //rowSelection: 'single',
            //rowDeselection: true,
            //columnDefs: this.columnDefs,
            rowModelType: 'virtual',
            enableServerSideSorting: true,
            enableServerSideFilter: true
        };
    }

    ngOnInit() {
       /*if(this.enricherService.hasValidServiceInfo(this.eOptions['action'])) {
           let _api = this.eOptions.action;// {'xhr': {url:'db-enricher/db/1', method:'get'} };
           this.enricherService.performOperation(_api).subscribe((res: any) => {
               let respData: any = res['data'];
               this.schemas = res['schema'];
               if (res && res['success'] && respData) {
                   this.updateGrid(respData);
                   this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
               }
           }, err => {});
       }else {
           let data = this.createRowData();
           setTimeout(()=>{
               this.updateGrid(data);
               this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));
               },0);
       }*/
    }

    updateGrid(data:Array<any>){
        this.gridOptions.api.setColumnDefs(this.createColumnDefs(data[0]));
        this.setRowData(data);
        this.gridOptions.api.sizeColumnsToFit();
        /*this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));*/
    }

    private createColumnDefs(data:any) {
        let keyNames = Object.keys(data);
        let headers:Array<any> = [];

        headers.push({
            headerName: "",
            suppressMenu: true,
            suppressSorting: true,
            suppressResize:true,
            width:66,
            template:`<div><button type="button" data-action-type="view" class="btn btn-default btn-white btn-xs"><i class="fa fa-pencil" data-action-type="view"></i></button>
                <button type="button" data-action-type="remove" class="btn btn-default btn-white btn-xs"><i class="fa fa-trash" data-action-type="remove"></i></button></div>`
        });

        keyNames.map(key => {
            headers.push({
                headerName: key.replace(/_/gi, " ").toUpperCase(),
                field: key,
                suppressMenu: false,
                suppressSorting: false,
                suppressResize: false,
            })
        });

        return headers;
    }
    //data gets mapped to the corresponding "field" key of the headers
    private createRowData() {
        return [
            {name: "Geller", age: 30, gender: "Male"},
            {name: "Geller", age: 28, gender: "Female"},
            {name: "Tribbiani", age: 29, gender: "Male"}
        ];
    }

    setRowData(allOfTheData:any) {
        let dataSource: any = {
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
    }

    ngOnDestroy() {}

    ngAfterViewInit(){
        /*debugger;
        let data = this.createRowData();
        this.gridOptions.api.setColumnDefs(this.createColumnDefs(data[0]));
        this.setRowData(data);
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));*/
        /*this.connectionServer = this.injector.get('data');
         let dynamicCols = this.injector.get('dynamicCols');
         let DBCollections = this.injector.get('DBCollections');
         this.gridOptions.api.setColumnDefs(dynamicCols);
         this.setRowData(DBCollections);
         this.gridOptions.api.sizeColumnsToFit();
         this.gridOptions.api.addEventListener('rowClicked', this.onRowClicked.bind(this));*/
    }

    createTable(){
        //this.openModal(new DBServerTableDescription(), DBETableDescriptionComponent, 'create');
    }

    refreshTable(){
        //this.callService(this.connectionServer);
    }
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

    public onActionViewClick(data: any, e: any){
        let _model = {
            eOptions: this.eOptions,
            isCreatorView : this.isCreatorView,
            type: this.eOptions.type,
            data: data,
            schemas: this.schemas,
            ok: (resp: any) => {
                console.log('check e-grid' + JSON.stringify(resp));
            }
        };
        let modal$ = this.modalPopupService.create(EGridDynamicEditPopupComponent,  _model);
        modal$.subscribe((ref) => {})
    }

    public onActionRemoveClick(data: any, e: any){
        //e.api.rowRenderer.renderedRows[e.rowIndex].destroy();
        console.log("Remove action clicked", data);
    }

    public onRowClicked(e:any, i:number) {
        if (e.event.target !== undefined) {
            let data = e.data, self = this;
            let actionType : string = e.event.target.getAttribute("data-action-type");

            if(actionType) {
                let _actionTypes : any = {
                    "view" : { action: this.onActionViewClick.bind(this)},
                    "remove" : { action: this.onActionRemoveClick.bind(this)},
                };
                _actionTypes[actionType].action(data, e);
            }
            return;
        }
    }
}
