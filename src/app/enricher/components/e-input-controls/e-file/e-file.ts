'use strict';
import { Component, Input, OnInit, OnChanges, ViewEncapsulation, Injector } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import {FileModel} from '../../../models/control.model';
import {InputFormControlService} from "../../../services";
import {ActionOperations} from '../../../models/toolkit-option.model';

@Component({
    selector:'e-file',
    template: '<input type="file">',
    encapsulation: ViewEncapsulation.None
})
export class eFile extends FileModel implements OnInit, OnChanges{
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
        let _data:any = new FileModel(this.eOptions);
        let _self: any = this;
        Object.keys(_data).forEach(function(item:string, i :number){
            _self[item] = _data[item];
        });
        this.action = new ActionOperations(this.eOptions.action);
    }
}