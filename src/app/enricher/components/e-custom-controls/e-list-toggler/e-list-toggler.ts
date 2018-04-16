'use strict';
import {
    Component, ViewChild, Input, OnInit, ViewEncapsulation,
    OnChanges, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {ToolkitControlModel} from "../../../models/toolkit-option.model";

@Component({
    selector: 'e-list-toggler',
    templateUrl: './e-list-toggler.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class eListTogglerControl implements OnInit, OnChanges {
    @Input() data: Array<any> = [];
    @Input() eOptions: any = {};
    itemData: Array<any> = [];

    constructor(private cdr: ChangeDetectorRef) {
    }



    ngOnInit(): void {
        let _action = this.eOptions.action;// {'xhr': {url:'', method:'get'} };
        /*if (this.enricherService.hasValidServiceInfo(_action) && _action['init'] === 'xhr') {

            this.enricherService.performOperation(_action).subscribe((res: any) => {
                let respData: Array<any> = res['data'];
                if (res && res['success'] && respData) {
                    let _modelMapping: any = _action.xhr.modelMapping;
                    if (_modelMapping) {
                        let data: Array<any> = [];
                        let _keys = Object.keys(_modelMapping);
                        respData.forEach((item: any, index: number) => {
                            let obj: any = {};

                            _keys.forEach((_item: string) => {
                                obj[_item] = obj[_item] || '';
                                _modelMapping[_item].map((it: string) => {
                                    obj[_item] += ' ' + item[it]
                                });
                            });
                            data.push(new ToolkitControlModel(Object.assign(obj, item)))
                        });
                        respData = data;
                    }
                    this.itemData = respData;
                    this.cdr.detectChanges();
                }
            }, err => {
            });
        };*/

        this.updateData();
    }

    updateData() {
        if (this.eOptions && this.eOptions.data) {
            this.itemData = this.eOptions.data;
        } else if (this.data) {
            this.itemData = this.data;
        }
    }

    trackByFn(index: number, e: any) {
        return e.id;
    }

    ngOnChanges(changes: any): void {
        /*if (!this.data) { return; }
        this.itemData = this.data;*/
        //this.itemData = this.eOptions.data;
        this.updateData();
    }

    scrollElem(index: number, dataItem: any) {
        dataItem.height = (dataItem.height > 0) ? 0 : (dataItem.children.length * 44);
        dataItem.class = (dataItem.height > 0) ? "fa fa-chevron-down" : "fa fa-chevron-right";
    }

    callback = (_type: string, data: any) => {
        /*debugger;this.enricherService.performAction({changeType: _type, data: data});*/

       setTimeout(() => {
           //this._actionService.callback.emit({cType: 'e-list-toggler', changeType: _type, data: data});
       }, 0)
    }
}
