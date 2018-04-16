'use strict';
import { Component, Input, ViewChild, OnInit, OnDestroy, OnChanges, ViewEncapsulation, ViewContainerRef } from '@angular/core';


@Component({
    selector: 'e-panel',
    templateUrl: './e-panel.html',
    encapsulation: ViewEncapsulation.None
})
export class ePanelControl implements OnInit, OnChanges {
    @ViewChild("elementRef", {read: ViewContainerRef}) viewContainerRef: any;
    @Input() eOptions:any;
    @Input() isCreatorView:boolean = false;
    data:Array<any> = [];

    controlOptions:Array<any> = [];

    constructor(){
    }

    ngOnInit(){
        console.log('panal Id : '+this.eOptions['id']);
        //this._config.updateViewId(this.viewContainerRef.element.nativeElement, this.eOptions);
    }

    ngOnChanges(){
        this.controlOptions = this.eOptions['children'];
    }
}
