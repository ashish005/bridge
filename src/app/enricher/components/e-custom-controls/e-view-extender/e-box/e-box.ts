'use strict';
import { Component, Input, ViewChild, ViewChildren, QueryList, OnInit, OnDestroy, OnChanges, ElementRef, AfterViewInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';

@Component({
    selector: '[e-box]',
    templateUrl: './e-box.html',
    encapsulation: ViewEncapsulation.None
})
export class eBoxControl implements OnInit, OnChanges {
    @ViewChild("boxElementRef", {read: ViewContainerRef}) viewContainerRef: any;
    @Input() eOptions:any;
    @Input() isCreatorView:boolean = false;
    data:Array<any> = [];

    controlOptions:Array<any> = [];

    constructor(){
    }

    ngOnInit(){
        //this._config.updateViewId(this.viewContainerRef.element.nativeElement, this.eOptions);
    }

    ngOnChanges(){
        if (!this.eOptions) return;
        this.controlOptions = this.eOptions['children'];
    }
}
