'use strict';
import {
    Component, Input, Renderer, ViewChildren, QueryList, OnInit, OnDestroy, OnChanges, ElementRef, AfterViewInit,
    ViewEncapsulation, ViewContainerRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

@Component({
    selector: 'e-tab',
    templateUrl: './e-tab.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class eTabControl implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @ViewChild("boxElementRef", {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
    @ViewChild("activeTabElementRef", {read: ViewContainerRef}) activeTabElementRef: ViewContainerRef;
    @Input() eOptions:any;
    @Input() isCreatorView:boolean = false;
    private parentId :string;
    activeComp :any;
    private _temp = [1,2];
    tabs:Array<any> = [];
    private activeIndex:any = 0;
    constructor(private cdr: ChangeDetectorRef){
    }

    ngOnInit(){
        //console.log('Tab Id : '+this.eOptions['id']);
        //this.viewContainerRef.element.nativeElement['id'] = this.parentId = this.eOptions['id'];
        this.parentId = this.eOptions['id'];
        //this._config.updateViewId(this.activeTabElementRef.element.nativeElement, this.eOptions);
        setTimeout(()=>{
            this.initialize()
        }, 0);
    }

    initialize(){
        if(!this.eOptions['children']){
            this.eOptions['children'] = [];
            this._temp.forEach((item:number, index:number)=>{
                let _data:any = { index: index, name: `Tab ${item}`, canClone: true, isDraggable: true, isEditable:true, canBeDeleted:false, canBeApplied:false };
                this.tabs.push(_data);
                _data.parentRef = this.parentId;
                _data['children'] = (0===index)?[]:[];
                //this.toolkitModelGenerator.setViewOption(this.parentId, new ToolkitControlModel(_data));
            });
        } else {
            this.tabs = this.eOptions['children'];
        }
        this.setActiveTab();
    }

    ngOnChanges(){
        if(this.eOptions['children']){
            this.tabs = this.eOptions['children'];
            this.activeComp = this.tabs[this.activeIndex];
            //this.toolkitModelGenerator.setViewOption(this.eOptions.parentRef, this.tabs);
            //this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }

    ngOnDestroy() {}

    ngAfterViewInit(){}

    setActiveTab(){
        if(this.eOptions['children'] && this.eOptions['children'].length>0){
            this.activeComp = this.eOptions['children'][this.activeIndex];
            //this.activeTabElementRef.element.nativeElement['id'] = this.activeComp['id'];
            //this._config.updateViewId(this.activeTabElementRef.element.nativeElement, this.activeComp);
            this.cdr.markForCheck();
            //this.cdr.detectChanges();
        }
    }

    OpenTabContainer(tab:any, index:number){
        this.activeIndex = index;
        this.setActiveTab();
    }
}
