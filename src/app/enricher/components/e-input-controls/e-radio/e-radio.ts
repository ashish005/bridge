'use strict';
import { Component, Input, OnInit, OnChanges, ViewEncapsulation, Injector } from '@angular/core';
import {ActionOperations} from '../../../models/toolkit-option.model';
import {RadioModel} from '../../../models/control.model';
import {InputFormControlService} from '../../../services/input-form-control.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector:'e-radio',
    templateUrl: './e-radio.html',
    encapsulation: ViewEncapsulation.None
})
export class eRadio extends RadioModel implements OnInit, OnChanges {
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
        let _data:any = new RadioModel(this.eOptions);
        let _self: any = this;
        Object.keys(_data).forEach(function(item:string, i :number){
            _self[item] = _data[item];
        });
        this.action = new ActionOperations(this.eOptions.action);
    }
}