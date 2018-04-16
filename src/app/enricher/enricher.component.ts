import {
  Component, ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CreateComponentService} from './util/create-component.service';
import {inputComponentFactory} from "./components/e-input-controls/index";
import {customComponentFactory} from "./components/e-custom-controls/index";



function componentFactory(options: any) {
  let mapComp: any = {
    'input': inputComponentFactory,
    'custom': customComponentFactory,
    //'charts': chartComponentFactory
  };
  return mapComp[options['type']](options);
}

@Component({
  selector: '[e-dynamic-view-loader]',
  template: '<div #container></div>ashish',
})
export class DynamicViewLoader implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @Input() eOptions: any;
  @Input() isCreatorView = false;
  cType = '';

  @Input() control: any;
  @Input() innerHTML: string;

  componentRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef,
              private ccuService: CreateComponentService) {
  }

  ngOnInit() {
    debugger
    /*this.cType = this.eOptions.cType; let _component: any;

    if (this.cType) {
      debugger;
      _component = componentFactory(this.eOptions);
      if (!_component) {
        console.log('No Controles Found...');
      }
      const componentInstance: any = this.ccuService.createComponent(_component, this.container);
      componentInstance.eOptions = this.eOptions;
      componentInstance.isCreatorView = this.isCreatorView || false;
    }*/
  }

  create() {
    /*let _options: any = this.control;
    let componentInstance: any = this.ccuService.createComponent(eController, this.vcRef);
    componentInstance.eOptions = _options || {};
    componentInstance.form = this.form;
    componentInstance.isCreatorView = this.isCreatorView || false;
    componentInstance.control = this.control;*/

    this.cType = this.control.cType; let _component: any;
    if (this.cType) {
      _component = componentFactory(this.control);
      if (!_component) {
        console.log('No Controles Found...');
      }
      const componentInstance: any = this.ccuService.createComponent(_component, this.container);
      componentInstance.control = this.control;
      componentInstance.isCreatorView = this.isCreatorView || false;
    }
  }

  createHTML(){
    const html = this.innerHTML;
    this.ccuService.createHTML(html, this.vcRef);
  }

  ngOnChanges() {
    //this.createHTML();
    this.create();
  }

  ngOnDestroy() {
    this.ccuService.destroyComponentRef();
  }
}

@Component({
  selector: '[e-dynamic-view]',
  template: `<div *ngFor="let viewItem of data; let i = index"><!--trackBy: trackByFn;-->
          <div [class]="viewItem['class']" [ngStyle]="viewItem['style']">
            <div e-dynamic-view-loader [control]="viewItem" [isCreatorView]="isCreatorView"></div>
          </div>
        </div>`
})
export class EDynamicViewComponent implements OnInit {
  @Input() data: Array<any>= [];
  @Input() isCreatorView = false;

  ngOnInit() {
    /*debugger
    this.cType = this.eOptions.cType; let _component: any;

    if (this.cType) {
      debugger;
      _component = componentFactory(this.eOptions);
      if (!_component) {
        console.log('No Controles Found...');
      }
      const componentInstance: any = this.ccuService.createComponent(_component, this.container);
      componentInstance.eOptions = this.eOptions;
      componentInstance.isCreatorView = this.isCreatorView || false;
    }*/
  }

  constructor(private el: ElementRef) {
  }

  trackByFn(index: number, e: any) {
    return e.id;
  }

  cb(data: any) {
    //let index = this.data.map((x: any) => {return x.id; }).indexOf(data.id);
    const elementPos = this.data.findIndex((x: any) => x.id === data.id);
    this.data.splice(elementPos, 1, data);
  }
}

@Component({
  selector: 'enricher',
  template: `<div e-dynamic-view [data]="data" [isCreatorView]="isCreatorView"></div>`
})
export class EnricherComponent {
  @Input() data: Array<any>= [];
  @Input() isCreatorView;
  constructor(private el: ElementRef) {}
}
