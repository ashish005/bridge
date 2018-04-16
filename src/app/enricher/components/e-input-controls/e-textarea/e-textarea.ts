'use strict';
import { Component, Input, OnInit, OnChanges, ViewEncapsulation, Injector } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActionOperations} from '../../../models/toolkit-option.model';
import {TextAreaModel} from '../../../models/control.model';
import {InputFormControlService} from "../../../services/input-form-control.service";

@Component({
    selector:'e-textarea',
    templateUrl: './e-textarea.html',
    encapsulation: ViewEncapsulation.None
})
export class eTextarea extends TextAreaModel implements OnInit, OnChanges {
    @Input() eOptions:any;
    @Input() form: FormGroup;

    constructor(private ifcService: InputFormControlService) {
        super();
    }

    ngOnInit(){
        this.getProps();
        this.ifcService.checkAndUpdateFormGroupById(this.eOptions, this.form, this.id);
    }

    ngOnChanges(){
    }

    get isValid() {
        return this.ifcService.validateForm(this.form, this.id);
    };

    getProps(){
        let _data:any = new TextAreaModel(this.eOptions);
        let _self: any = this;
        Object.keys(_data).forEach(function(item:string, i :number){
            _self[item] = _data[item];
        });
        this.action = new ActionOperations(this.eOptions.action);
    }
}
