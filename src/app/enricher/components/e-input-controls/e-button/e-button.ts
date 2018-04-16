'use strict';
import { Component, Input, OnInit, OnChanges, ViewEncapsulation, Injector, ElementRef, Renderer } from '@angular/core';
import { InputBase, ButtonModel } from '../../../models/control.model';
import { FormGroup } from '@angular/forms';
import {InputFormControlService } from '../../../services';
import {ActionOperations} from '../../../models/toolkit-option.model';
//import {ToolkitModelGeneratorService} from '../../../../services/index';

@Component({
    selector: 'e-button',
    templateUrl: './e-button.html',
    encapsulation: ViewEncapsulation.None
})

export class eButton extends ButtonModel implements  OnInit, OnChanges {
    @Input() eOptions: any;
    @Input() form: FormGroup;

    constructor(elementRef: ElementRef,
                renderer: Renderer,
                private ifcService: InputFormControlService)//private tkmGeneratorService: ToolkitModelGeneratorService
    {
        super();
        // Listen to click events in the component
        renderer.listen(elementRef.nativeElement, 'click', (event: any) => {
            // Do something with 'event'
            let _action: any = this.eOptions.action;
            let _operation = _action.click;
            if ('exec' === _operation) {
                let exec: string = _action['exec'];
                (<any>this)['tkmGeneratorService'][exec]();
            } else {
                let model = this.ifcService.createModel(this.form.value, this.eOptions);
                //enricherService.inutEventHandlerOperation('click', this.eOptions, model, this.tkmGeneratorService.getViewData());
            }
        });
    }

    ngOnInit() {
        this.getProps();
        this.ifcService.checkAndUpdateFormGroupById(this.eOptions, this.form, this.id);
        //this.createNewControl();
    }

    ngOnChanges() {
    }

    get isValid() {
        return this.ifcService.validateForm(this.form, this.id);
    };

    getProps() {
        let _data: any = new ButtonModel(this.eOptions);
        let _self: any = this;
        Object.keys(_data).forEach(function(item: string, i: number){
            _self[item] = _data[item];
        });
        this.action = new ActionOperations(this.eOptions.action);
    }
}
