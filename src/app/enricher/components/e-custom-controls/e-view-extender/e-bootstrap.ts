'use strict';
import { Component, Input, Renderer, ViewChildren, QueryList, OnInit, OnDestroy, OnChanges, ElementRef, AfterViewInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';

@Component({
    selector: '[e-bootstrap]',
    template: '<div e-dynamic-view class="clear" [data]="eOptions?.children" [isCreatorView]="isCreatorView"></div>',
    encapsulation: ViewEncapsulation.None
})
export class eBootstrapControl implements OnInit, OnChanges {
    @Input() eOptions:any;
    @Input() isCreatorView:boolean = false;
    controlOptions:Array<any> = [];

    constructor(private el:ElementRef){
    }

    ngOnInit(){
        console.log('Bootstrap Id : '+this.eOptions['id']);
        this.el.nativeElement['id'] = this.eOptions['id'];
    }

    ngOnChanges(){
        this.controlOptions = this.eOptions['children'];
    }
}
